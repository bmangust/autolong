<?php

namespace App\Http\Controllers;

use App\City;
use App\Http\Resources\ProductResource;
use App\Importer;
use App\Order;
use App\Product;
use App\Provider;
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
        $order->setOrderPaymentStatus($request->input('statusPayment'));
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function checkProductNumberWithUs(Request $request, Order $order)
    {
        $request->validate([
            'numbers' => 'required'
        ]);
        $numbers = $order->cleanSpaceInArrayItems($request->input('numbers'));
        $availableProducts = [];
        foreach ($numbers as $number) {
            $product = Product::whereAutolongNumber($number);
            if ($product->exists()) {
                $provider = $product->first()->provider->id;
                $availableProducts[$provider] =  new ProductResource($product->first());
            } else {
                $availableProducts[] = ['number' => $number];
            }
        }
        return response()->json($availableProducts, 200);
    }

    public function getPdfContract(Order $order)
    {
        if ($order->contract != null) {
            return response()->json($order->contract->getInfo(), 200);
        }
        return response()->json('Для данного заказа не сформирован автоматически контракт', 400);
    }

    public function generatePdfContract(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        $order->contract->saveInfoWithJson($request->all());
        $contract = $order->contract->getInfo();

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
            'classificationRu' => $contract->classificationRu,
            'classificationEn' => $contract->classificationEn,
            'contractEndDate' => $contract->contractEndDate
        ]);
        return $newPdf->download();
    }

    public function getPdfProforma(Order $order)
    {
        if ($order->proforma != null) {
            return response()->json($order->proforma->getInfo());
        }
        return response()->json('Для данного заказа не сформирована автоматически проформа', 400);
    }

    public function generatePdfProforma(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        $order->proforma->saveInfoWithJson($request->all());
        $proforma = $order->proforma->getInfo();
        $contract = $order->contract->getInfo();

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.proforma', [
            'order' => $order,
            'supply' => $proforma->supply,
            'importer' => $importer,
            'provider' => $provider,
            'contract' => $contract->name,
            'orderItems' => $order->orderItems,
            'statusPayment' => $proforma->statusPayment,
        ]);
        return $newPdf->download();
    }

    public function getPdfInvoice(Order $order)
    {
        if ($order->invoice != null) {
            return response()->json($order->invoice->getInfo());
        }
        return response()->json('Для данного заказа не сформирован автоматически инвойс', 400);
    }

    public function generatePdfInvoice(Request $request, Order $order)
    {
        $importer = Importer::first();
        $provider = $order->provider;

        $order->invoice->saveInfoWithJson($request->all());
        $invoice = $order->invoice->getInfo();
        $proforma = $order->proforma->getInfo();
        $contract = $order->contract->getInfo();

        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.invoice', [
            'order' => $order,
            'supply' => $invoice->supply,
            'importer' => $importer,
            'provider' => $provider,
            'contract' => $contract->name,
            'orderItems' => $order->orderItems,
            'proformaDate' => $proforma->date,
            'proformaNumber' => $proforma->proformaNumber,
            'proformaStatusPayment' => $invoice->proformaStatusPayment,
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
