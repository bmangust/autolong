<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderItemResource;
use App\OrderItem;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    protected function orderItemCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
            'rub' => 'рубль',
            'usd' => 'доллар',
            'cny' => 'юань'
        ];

        return Validator::make($data, [
            'rub' => ['required', 'integer'],
            'usd' => ['required', 'integer'],
            'cny' => ['required', 'integer'],
        ], $messages, $names);
    }

    public function update(Request $request, OrderItem $orderItem)
    {
        $this->orderItemCreateValidator($request->all())->validate();
        $orderItem->rub = $request->input('rub');
        $orderItem->usd = $request->input('usd');
        $orderItem->cny = $request->input('cny');
        $orderItem->save();
        response()->json(new OrderItemResource($orderItem), 200);
    }
}
