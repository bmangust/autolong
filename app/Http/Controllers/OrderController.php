<?php

namespace App\Http\Controllers;

use App\City;
use App\ContractDocument;
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
use Symfony\Component\HttpKernel\Exception\HttpException;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $orders = Order::with([
                'orderItems',
                'provider',
                'sandboxFiles',
                'container',
                'city'])->orderByDesc('updated_at')->get();
        return response()->json(OrderWithRelationshipsResource::collection($orders, 200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->orderCreateValidator($request->all())->validate();
        $order = new Order();
        $order->name = $request->input('name');
        $order->provider_id = $request->input('providerId');
        if ($request->has('cargo')) {
            $order->cargo = $request->input('cargo');
        }
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
     * @return \Illuminate\Http\JsonResponse
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
        if ($request->has('cargo')) {
            $order->cargo = $request->input('cargo');
        }
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
        } elseif ($request->has('arrivalDate') && $request->has('city')) {
            if (!$order->checkActualDate($request->input('arrivalDate'))) {
                throw new HttpException(400, 'Указана не актуальная дата');
            }
            $city = City::firstOrCreate([
                    'name' => City::translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords($request->input('city'))
            ]);
            $arrivalDate = $request->input('arrivalDate');
            $order->setOrderStatus($status, $city->id, $arrivalDate);
        } elseif (!is_null($order->city) && !is_null($order->arrival_date)) {
            $order->setOrderStatus($status);
        } else {
            throw new HttpException(400, 'Заполнена не вся информация для статуса "Находится в производстве"');
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
            $paymentPaidFor = Status::getOrderPaymentPaidFor();

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

            if ($order->status_payment == $paymentAwaiting || $order->status_payment == $paymentPaidFor) {
                if ($paymentAmount >= $order->getOrderSumInCny()) {
                    $order->setOrderPaymentStatus($paymentPrepaymentMade, $paymentAmount, $surchargeAmount);
                }
                if ($paymentAmount < $order->getOrderSumInCny()) {
                    $order->setOrderPaymentStatus($paymentPaidFor, $paymentAmount, $surchargeAmount);
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
            $product = Product::wherePublished(1)->whereAutolongNumber($number);
            if ($product->exists()) {
                $providerId = $product->first()->provider->id;
                if (array_key_exists($providerId, $availableAndUnknownProducts)) {
                    $availableAndUnknownProducts[$providerId][] = new ProductResource($product->first());
                } else {
                    $availableAndUnknownProducts[$providerId] = array(new ProductResource($product->first()));
                }
            } else {
                $availableAndUnknownProducts[$unknownProductsKey][] = $number;
            }
        }
        return response()->json($availableAndUnknownProducts);
    }

    public function getPdfContract(Order $order)
    {
        if ($order->contract != null) {
            return response()->json($order->contract->getInfo(), 200);
        }
        return response()->json($order->contractActualRows, 200);
    }

    public function generatePdfContract(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        if (!is_null($order->contract)) {
            $oldContract = $order->contract->getInfo();
        }

        $stampDirectory = Order::STAMP_DIRECTORY;

        if ($request->hasFile('providerStamp') && $request->file('providerStamp')->isValid()) {
            $request->validate(
                    ['providerStamp' => 'file|mimes:png,jpg,jpeg']
            );
            $providerStamp = $order->saveStamp($stampDirectory, uniqid('stamp-', false), $request->file('providerStamp'));
        } elseif (isset($oldContract->providerStamp)) {
            $providerStamp = $oldContract->providerStamp;
        } else {
            $providerStamp = null;
        }

        if ($request->hasFile('importerStamp') && $request->file('importerStamp')->isValid()) {
            $request->validate(
                    ['importerStamp' => 'file|mimes:png,jpg,jpeg']
            );
            $importerStamp = $order->saveStamp($stampDirectory, uniqid('stamp-', false), $request->file('importerStamp'));
        } elseif (isset($oldContract->importerStamp)) {
            $importerStamp = $oldContract->importerStamp;
        } else {
            $importerStamp = null;
        }

        $signatureDirectory = Order::SIGNATURE_DIRECTORY;

        if ($request->hasFile('importerSignature') && $request->file('importerSignature')->isValid()) {
            $request->validate(
                    ['importerSignature' => 'file|mimes:png,jpg,jpeg']
            );
            $importerSignature = $order->saveStamp($signatureDirectory, uniqid('signature-', false), $request->file('importerSignature'));
        } elseif (isset($oldContract->importerSignature)) {
            $importerSignature = $oldContract->importerSignature;
        } else {
            $importerSignature = null;
        }

        if ($request->hasFile('providerSignature') && $request->file('providerSignature')->isValid()) {
            $request->validate(
                    ['providerSignature' => 'file|mimes:png,jpg,jpeg']
            );
            $providerSignature = $order->saveStamp($signatureDirectory, uniqid('signature-', false), $request->file('providerSignature'));
        } elseif (isset($oldContract->providerSignature)) {
            $providerSignature = $oldContract->providerSignature;
        } else {
            $providerSignature = null;
        }

        $all = $request->all();

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $order->checkActualIfNotThenChangeContract($all);
        if (!is_null($order->contract)) {
            $order->contract->saveInfoWithJson($all);
            $contract = (array)$order->contract->getInfo();
        } else {
            $contract = ContractDocument::whereOrderId($order->id)->first();
            $contract->saveInfoWithJson($all);
        }

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
                'importer' => $importer,
                'provider' => $provider,
                'order' => $order,
                'contract' => $contract,
        ]);
        return $newPdf->download();
    }

    public function getPdfProforma(Order $order)
    {
        if ($order->proforma != null) {
            return response()->json($order->proforma->getInfo());
        }
        return response()->json($order->proformaActualRows, 200);
    }

    public function generatePdfProforma(Request $request, Order $order)
    {
        $request->validate([
                '*' => 'max:255',
        ]);
        $importer = Importer::first();
        $provider = $order->provider;

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $order->checkActualIfNotThenChangeProforma($request->all());

        $order->proforma->saveInfoWithJson($all);
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
        return response()->json($order->invoiceActualRows, 200);
    }

    public function generatePdfInvoice(Request $request, Order $order)
    {
        $request->validate([
                '*' => 'max:255',
        ]);
        $importer = Importer::first();
        $provider = $order->provider;

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $order->checkActualIfNotThenChangeInvoice($request->all());

        $order->invoice->saveInfoWithJson($all);
        $invoice = (array)$order->invoice->getInfo();
        $contract = (array)$order->contract->getInfo();

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.invoice', [
                'order' => $order,
                'importer' => $importer,
                'provider' => $provider,
                'orderItems' => $order->orderItems,
                'invoice' => $invoice,
                'contract' => $contract
        ]);
        return $newPdf->download();
    }

    public function generatePdfPackingList(Request $request, Order $order)
    {
        if (!$request->input('old')) {
            $orderItemsInfo = $request->except('old');
            foreach ($orderItemsInfo as $key => $info) {
                $orderItem = OrderItem::findOrFail($key);
                $pcsCtnCtns = array_merge([], ['pcsCtn' => $info['pcsCtn']], ['ctns' => $info['ctns']]);
                $orderItem->pcs_ctn_ctns = json_encode($pcsCtnCtns);
                $orderItem->meas = json_encode($info['meas']);
                $orderItem->save();
            }
        }

        $importer = Importer::first();
        $provider = $order->provider;
        $orderItems = $order->orderItems;
        if ($order->contract && isset($order->contract->getInfo()->name)) {
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
        ])->setPaper('a4', 'landscape');
        return $newPdf->download();
    }

    public function getMarkingList(Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;
        $hsCodes = $order->getProductsHsCode();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.marking', [
                'order' => $order,
                'importer' => $importer,
                'provider' => $provider,
                'hsCodes' => $hsCodes,
        ]);
        return $newPdf->download();
    }

    public function getPdfAccount(Order $order)
    {
        if ($order->account != null) {
            return response()->json($order->account->getInfo());
        }
        return response()->json($order->accountActualRows, 200);
    }

    public function generatePdfAccount(Request $request, Order $order)
    {
        $request->validate([
                '*' => 'max:255',
        ]);
        $importer = Importer::first();
        $provider = $order->provider;

        if (!$order->contract()->count() || is_null($order->contract->info)) {
            $order->generateContract();
        }
        if (!$order->proforma()->count() || is_null($order->proforma->info)) {
            $order->generateProforma();
        }
        if (!$order->invoice()->count() || is_null($order->invoice->info)) {
            $order->generateInvoice();
        }
        if (!$order->account()->count() || is_null($order->account->info)) {
            $order->generateAccount();
        }

        $all = $order->checkActualIfNotThenChangeAccount($request->all());

        $order->account->saveInfoWithJson($all);
        $account = $order->account->getInfo();
        $contract = $order->contract->getInfo();

        $date = $account->date ?? null;
        $contractNumber = $account->contractNumber ?? null;
        $accountNumber = $account->accountNumber ?? null;

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.account', [
                'order' => $order,
                'supply' => $account->supply,
                'importer' => $importer,
                'provider' => $provider,
                'contractNumber' => $contractNumber,
                'accountNumber' => $accountNumber,
                'contract' => $contract->name,
                'orderItems' => $order->orderItems,
                'statusPayment' => $account->statusPayment,
                'date' => $date
        ]);
        return $newPdf->download();
    }

    public function deletePdfContractProviderStamp(Order $order)
    {
        $order->deletePdfContractFilesStampsOrSignatures('providerStamp');
        return response()->json([], 204);
    }

    public function deletePdfContractImporterStamp(Order $order)
    {
        $order->deletePdfContractFilesStampsOrSignatures('importerStamp');
        return response()->json([], 204);
    }

    public function deletePdfContractImporterSignature(Order $order)
    {
        $order->deletePdfContractFilesStampsOrSignatures('ImporterSignature');
        return response()->json([], 204);
    }

    public function deletePdfContractProviderSignature(Order $order)
    {
        $order->deletePdfContractFilesStampsOrSignatures('ProviderSignature');
        return response()->json([], 204);
    }

    public function indexUnapplied()
    {
        $unappliedOrders = Order::all()->where('container_id', '=', null)
                ->where('status', '!=', array_keys(get_object_vars(Status::getOrderStatuses()), 'Создан')[0])
                ->sortByDesc('updated_at');
        return response()->json(OrderWithRelationshipsResource::collection($unappliedOrders, 200));
    }
}
