<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Order;
use App\Product;
use App\Status;
use Illuminate\Http\Request;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->orderCreateValidator($request->all())->validate();
        $order = new Order();
        $order->name = $request->input('name');
        $order->provider_id = $request->input('providerId');
        $order->cargo = $request->input('cargo');
        $order->status = Status::getOrderStatuses()->orderCreated;
        $order->status_payment = Status::getOrderPaymentStatuses()->paymentAwaiting;
        $order->save();
        if ($request->has('items') && is_array($request->input('items'))) {
            $order->addOrderItems($request->input('items'));
        }
        return response()->json(new OrderWithRelationshipsResource($order), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $this->orderCreateValidator($request->all())->validate();
        $order->name =$request->input('name');
        $order->provider_id = $request->input('providerId');
        $order->cargo = $request->input('cargo');
        $order->setOrderStatus($request->input('status'));
        $order->setOrderPaymentStatus($request->input('statusPayment'));
        $order->save();
        if ($request->has('items') && is_array($request->input('items'))) {
            $order->addOrderItems($request->input('items'));
        }
        return response()->json(new OrderWithRelationshipsResource($order), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->orderItems()->delete();
        $order->delete();
        return response()->json([], 204);
    }

    public function changeStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required',
        ]);
        $order->setOrderStatus($request->input('status'));
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

    public function checkProductNUmberWithUs(Request $request)
    {
        $request->validate([
            'numbers' => 'required'
        ]);
        $numbers = $request->input('numbers');
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
}
