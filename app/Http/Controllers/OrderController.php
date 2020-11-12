<?php

namespace App\Http\Controllers;

use App\City;
use App\Http\Resources\ProductResource;
use App\Order;
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
        $order->setOrderPaymentStatus($request->input('statusPayment'));
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    public function checkProductNUmberWithUs(Request $request, Order $order)
    {
        $request->validate([
            'numbers' => 'required'
        ]);
        $numbers = $order->cleanSpaceInArrayItems($request->input('numbers'));
        $availableProducts = [];
        foreach ($numbers as $number) {
            $product = Product::whereAutolongNumber($number);
            if ($product->exists()) {
                $availableProducts[] = new ProductResource($product->first());
            } else {
                $availableProducts[] = ['number' => $number];
            }
        }
        return $availableProducts;
    }

    public function getPdfContract(Order $order)
    {
        $contract = $order->contract->getInfo();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
            'name' => $contract->name,
            'date' => $contract->date,
            'supply' => $contract->supply,
            'importer' => $contract->importer,
            'provider' => $contract->provider,
            'orderPrice' => $contract->orderPrice,
            'classification' => $contract->classification,
            'providerCountry' => $order->provider->country->name,
        ]);
        return $newPdf->download();
    }

    public function generatePdfContract(Request $request, Order $order)
    {
        $contract = $order->contract->saveInfoWithJson(array($request->all()));
        $contract = $contract->getInfo();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
            'name' => $contract->name,
            'date' => $contract->date,
            'supply' => $contract->supply,
            'importer' => $contract->importer,
            'provider' => $contract->provider,
            'orderPrice' => $contract->orderPrice,
            'classification' => $contract->classification,
            'providerCountry' => $order->provider->country->name,
        ]);
        return $newPdf->download();
    }

    public function getPdfProforma(Order $order)
    {
        $proforma = $order->proforma->getInfo();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.proforma', [
            'order' => $this,
            'supply' => $proforma->supply,
            'importer' => $proforma->importer,
            'provider' => $proforma->provider,
            'orderItems' => $this->orderItems,
            'statusPayment' => $proforma->statusPayment,
        ]);
        return $newPdf->download();
    }

    public function generatePdfProforma(Request $request, Order $order)
    {
        $proforma = $order->proforma->saveInfoWithJson(array($request->all()));
        $proforma = $proforma->getInfo();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.proforma', [
            'order' => $this,
            'supply' => $proforma->supply,
            'importer' => $proforma->importer,
            'provider' => $proforma->provider,
            'orderItems' => $this->orderItems,
            'statusPayment' => $proforma->statusPayment,
        ]);
        return $newPdf->download();
    }

    public function getPdfInvoice(Order $order)
    {
        $invoice = $order->invoice->getInfo();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
            'order' => $this,
            'supply' => $invoice->supply,
            'importer' => $invoice->importer,
            'provider' => $invoice->provider,
            'orderItems' => $order->orderItems,
            'proformaStatusPayment' => $invoice->proformaStatusPayment,
        ]);
        return $newPdf->download();
    }

    public function generatePdfInvoice(Request $request, Order $order)
    {
        $invoice = $order->invoice->saveInfoWithJson(array($request->all()));
        $invoice = $invoice->getInfo();
        $pdf = App::make('dompdf.wrapper');
        $newPdf = $pdf->loadView('pdf.contract', [
            'order' => $this,
            'supply' => $invoice->supply,
            'importer' => $invoice->importer,
            'provider' => $invoice->provider,
            'orderItems' => $order->orderItems,
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
