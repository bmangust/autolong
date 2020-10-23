<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Product;
use App\OrderItem;

class Order extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = ['name', 'provider_id'];

    public function provider()
    {
        return $this->belongsTo('App\Provider');
    }

    public function orderItems()
    {
       return $this->hasMany('App\OrderItem');
    }

    public function addOrderItems($items)
    {
        if ($this->orderItems()->count()) {
            $this->orderItems()->delete();
        }
        foreach ($items as $item) {
            $orderItem = new OrderItem();
            $product = Product::findOrFail($item['id']);
            $orderItem->order_id = $this->id;
            $orderItem->product_id = $product->id;
            $orderItem->quantity = $item['quantity'];
            $orderItem->price_cny = $product->price_cny;
            $orderItem->save();
        }
    }

    public function getOrderSumInCny()
    {
        $sum = 0;
        foreach ($this->orderItems as $orderItem) {
            $sum += $orderItem->getSumInCny();
        }
        return $sum;
    }

    public function getOrderSumInRub()
    {
        $sum = 0;
        foreach ($this->orderItems as $orderItem) {
            $sum += $orderItem->getSumInRub();
        }
        return $sum;
    }

    public function getOrderSumInUsd()
    {
        $sum = 0;
        foreach ($this->orderItems as $orderItem) {
            $sum += $orderItem->getSumInUsd();
        }
        return $sum;
    }
}
