<?php

namespace App\Http\Controllers;

use App\City;
use App\Http\Resources\ProductResource;
use App\Importer;
use App\Order;
use App\OrderItem;
use App\Product;
use App\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\OrderWithRelationshipsResource;

class OrderController extends Controller
{
    protected function orderCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
        ];

        $names = [
            'name' => 'название',
            'providerId' => 'поставщик',
        ];

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'providerId' => ['required', 'integer'],
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(OrderWithRelationshipsResource::collection(Order::all()->sortByDesc('updated_at'), 200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->orderCreateValidator($request->all())->validate();
        $order = new Order();
        $order->name = $request->input('name');
        $order->provider_id = $request->input('providerId');
        $order->cargo = $request->input('cargo');
        $order->status = array_keys(get_object_vars(Status::getOrderStatuses()), 'Создан')[0];
        $order->status_payment = array_keys(get_object_vars(Status::getOrderPaymentStatuses()), 'Ожидает оплаты')[0];
        $order->save();
        if ($request->has('items') && is_array($request->input('items'))) {
            $order->addOrderItems($request->input('items'));
        }
        $order->generateContract();
        $order->generateProforma();
        $order->generateInvoice();
        return response()->json(new OrderWithRelationshipsResource($order), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $this->orderCreateValidator($request->all())->validate();
        $order->name = $request->input('name');
        $order->provider_id = $request->input('providerId');
        $order->cargo = $request->input('cargo');
        if ($order->status != $request->input('status')) {
            $order->setOrderStatus($request->input('status'));
        }
        if ($order->status_payment != $request->input('statusPayment')) {
            $order->setOrderPaymentStatus($request->input('statusPayment'));
        }
        $order->save();
        if ($request->has('items') && is_array($request->input('items'))) {
            $order->addOrderItems($request->input('items'));
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([], 204);
    }

    public function changeStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required',
        ]);
        $status = $request->input('status');
        $statusOrderInProduction = array_keys(get_object_vars(Status::getOrderStatuses()), 'Находится в производстве')[0];
        if ($status != $statusOrderInProduction) {
            $order->setOrderStatus($status);
        } elseif ($request->has('arrivalDate') && $order->checkActualDate($request->input('arrivalDate')) && $request->has('city')) {
            $city = City::firstOrCreate(['name' => City::translateUcFirstCyrillicAndOtherLc($request->input('city'))]);
            $arrivalDate = $request->input('arrivalDate');
            $order->setOrderStatus($status, $city->id, $arrivalDate);
        } else {
            return response()->json('Заполнена не вся информация для статуса "Находится в производстве"', 400);
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function changeStatusPayment(Request $request, Order $order)
    {
        $request->validate([
            'statusPayment' => 'required',
        ]);
        $status = $request->input('statusPayment');
        if ($request->has('paymentAmount') && $request->has('surchargeAmount')) {
            $paymentAmount = $request->input('paymentAmount');
            $surchargeAmount = $request->input('surchargeAmount');

            $paymentAwaiting = Status::getOrderPaymentAwaiting();
            $paymentPrepaymentMade = Status::getOrderPaymentPrepaymentMade();

            if ($order->status_payment == $paymentAwaiting) {
                $order->setOrderPaymentStatus($paymentPrepaymentMade, $paymentAmount, $surchargeAmount);
            }

            if ($order->status_payment == $paymentPrepaymentMade) {
                if ($paymentAmount >= $order->getOrderSumInCny()) {
                    $paymentPaidInFull = Status::getOrderPaymentPaidInFull();
                    $order->setOrderPaymentStatus($paymentPaidInFull, $paymentAmount, $surchargeAmount);
                }
                if ($paymentAmount < $order->getOrderSumInCny()) {
                    $paymentPrepaymentMade = Status::getOrderPaymentPrepaymentMade();
                    $order->setOrderPaymentStatus($paymentPrepaymentMade, $paymentAmount, $surchargeAmount);
                }
            }
            return response()->json(new OrderWithRelationshipsResource($order), 200);
        }
        $order->setOrderPaymentStatus($status);
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function checkProductNumberWithUs(Request $request, Order $order)
    {
        $request->validate([
            'numbers' => 'required'
        ]);
        $numbers = array_unique($order->cleanSpaceInArrayItems($request->input('numbers')));
        $unknownProductsKey = 'number';
        $availableAndUnknownProducts = [$unknownProductsKey => []];
        foreach ($numbers as $number) {
            $product = Product::whereAutolongNumber($number);
            if ($product->exists()) {
                $providerId = $product->first()->provider->id;
                if (array_key_exists($providerId, $availableAndUnknownProducts)) {
                    $value = $availableAndUnknownProducts[$providerId];
                    $value[] = new ProductResource($product->first());
                    $availableAndUnknownProducts[$providerId] = $value;
                } else {
                    $availableAndUnknownProducts[$providerId] = array(new ProductResource($product->first()));
                }
            } else {
                $value = $availableAndUnknownProducts[$unknownProductsKey];
                $value[] = $number;
                $availableAndUnknownProducts[$unknownProductsKey] = $value;
            }
        }
        return response()->json($availableAndUnknownProducts);
    }

    public function getPdfContract(Order $order)
    {
        if ($order->contract != null) {
            return response()->json($order->contract->getInfo(), 200);
        }
        return response()->json([
            'name' => null,
            'date' => null,
            'supply' => null,
            'directorRu' => null,
            'directorEn' => null,
            'requisites' => null,
            'classificationRu' => null,
            'classificationEn' => null,
            'contractEndDate' => null
        ], 200);
    }

    public function generatePdfContract(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        $order->autogenerateDocumentsIfTheyAreMissing();
        $order->contract->saveInfoWithJson($request->all());
        $contract = $order->contract->getInfo();

        $stampDirectory = Order::STAMP_DIRECTORY;
        if ($request->hasFile('providerStamp')) {
            $providerStamp = $order->saveStamp($stampDirectory, Order::STAMP_PROVIDER_NAME, $request->file('providerStamp'));
        } else {
            $providerStamp = null;
        }
        if ($request->hasFile('importerStamp')) {
            $importerStamp = $order->saveStamp($stampDirectory, Order::STAMP_IMPORTER_NAME, $request->file('importerStamp'));
        } else {
            $importerStamp = null;
        }

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
            'name' => $contract->name,
            'date' => $contract->date,
            'supply' => $contract->supply,
            'importer' => $importer,
            'provider' => $provider,
            'directorRu' => $contract->directorRu,
            'directorEn' => $contract->directorEn,
            'requisites' => $order->cutScriptTagsInText($contract->requisites),
            'orderPrice' => $order->getOrderSumInCny(),
            'providerStamp' => $providerStamp,
            'importerStamp' => $importerStamp,
            'contractEndDate' => $contract->contractEndDate,
            'classificationRu' => $contract->classificationRu,
            'classificationEn' => $contract->classificationEn
        ]);
        return $newPdf->download();
    }

    public function getPdfProforma(Order $order)
    {
        if ($order->proforma != null) {
            return response()->json($order->proforma->getInfo());
        }
        return response()->json([
            'supply' => null,
            'proformaNumber' => null,
            'contractNumber' => null,
            'statusPayment' => null,
            'date' => null,
        ], 200);
    }

    public function generatePdfProforma(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        $order->autogenerateDocumentsIfTheyAreMissing();
        $order->proforma->saveInfoWithJson($request->all());
        $proforma = $order->proforma->getInfo();
        $contract = $order->contract->getInfo();

        $date = $proforma->date ?? null;
        $contractNumber = $proforma->contractNumber ?? null;
        $proformaNumber = $proforma->proformaNumber ?? null;

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.proforma', [
            'order' => $order,
            'supply' => $proforma->supply,
            'importer' => $importer,
            'provider' => $provider,
            'contractNumber' => $contractNumber,
            'proformaNumber' => $proformaNumber,
            'contract' => $contract->name,
            'orderItems' => $order->orderItems,
            'statusPayment' => $proforma->statusPayment,
            'date' => $date
        ]);
        return $newPdf->download();
    }

    public function getPdfInvoice(Order $order)
    {
        if ($order->invoice != null) {
            return response()->json($order->invoice->getInfo());
        }
        return response()->json([
            'supply' => null,
            'proformaNumber' => null,
            'contractNumber' => null,
            'proformaStatusPayment' => null,
            'date' => null,
        ], 200);
    }

    public function generatePdfInvoice(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        $order->autogenerateDocumentsIfTheyAreMissing();
        $order->invoice->saveInfoWithJson($request->all());
        $invoice = $order->invoice->getInfo();

        $paymentTerms = $invoice->paymentTerms ?? null;
        $additionalField = $invoice->additionalField ?? null;

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.invoice', [
            'order' => $order,
            'supply' => $invoice->supply,
            'importer' => $importer,
            'provider' => $provider,
            'contract' => $invoice->contractNumber,
            'orderItems' => $order->orderItems,
            'proformaDate' => $invoice->date,
            'proformaNumber' => $invoice->proformaNumber,
            'proformaStatusPayment' => $invoice->proformaStatusPayment,
            'paymentTerms' => $paymentTerms,
            'additionalField' => $additionalField
        ]);
        return $newPdf->download();
    }

    public function generatePdfPackingList(Request $request, Order $order)
    {
        $orderItemsInfo = $request->all();
        foreach ($orderItemsInfo as $key => $info) {
            $orderItem = OrderItem::findOrFail($key);
            $orderItem->pcs_ctn_ctns = json_encode($info['PcsCtnCtns']);
            $orderItem->meas = json_encode($info['meas']);
            $orderItem->save();
        }

        $importer = Importer::first();
        $provider = $order->provider;
        $orderItems = $order->orderItems;
        if ($order->contract) {
            $contract = $order->contract->getInfo();
            $order->generateNamePackingListIfNull($contract->name);
        } else {
            $contract = '';
        }

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.packing-list', [
            'order' => $order,
            'importer' => $importer,
            'provider' => $provider,
            'orderItems' => $orderItems,
            'contract' => $contract
        ]);
        return $newPdf->download();
    }

    public function getMarkingList(Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;
        $hsCodes = $order->getProductsHsCode();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.packing-list', [
            'order' => $order,
            'importer' => $importer,
            'provider' => $provider,
            'hsCodes' => $hsCodes,
        ]);
        return $newPdf->download();
    }

    public function indexUnapplied()
    {
        $unappliedOrders = Order::all()->where('container_id', '=', null)
            ->where('status', '!=', array_keys(get_object_vars(Status::getOrderStatuses()), 'Создан')[0])
            ->sortByDesc('updated_at');
        return response()->json(OrderWithRelationshipsResource::collection($unappliedOrders, 200));
    }
}
