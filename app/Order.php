<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Product;
use App\OrderItem;

class Order extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = ['name', 'provider_id'];

    protected static function booted()
    {
        static::created(function (Order $order) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => get_class($order),
                ]);
            }
        });

        static::updated(function (Order $order) {
            if (Log::$write) {
                $log = new Log();
                $before = $order->getOriginal();
                $after = $order->toArray();
                $log->create([
                    'action' => Log::ACTION_UPDATED,
                    'model' => get_class($order),
                    'before' => json_encode(array_diff($before, $after)),
                    'after' => json_encode(array_diff($after, $before)),
                ]);
            }
        });

        static::deleted(function (Order $order){
            $order->orderItems()->delete();
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_DELETED,
                    'model' => get_class($order),
                ]);
            }
        });
    }

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
        $exchangeRate = new ExchangeRate();
        foreach ($items as $item) {
            $orderItem = new OrderItem();
            $product = Product::findOrFail($item['id']);
            $orderItem->product_id = $product->id;
            $orderItem->order_id = $this->id;
            $orderItem->quantity = $item['quantity'];
            $priceCny = $item['price']['cny'];
            $orderItem->price_cny = $priceCny;
            $orderItem->price_rub = $exchangeRate->lastCourse()->rub * $priceCny;
            $orderItem->price_usd = $exchangeRate->lastCourse()->usd * $priceCny;
            $orderItem->save();
            if ($orderItem->price_cny != $product->price_cny) {
                $product->changePrices($orderItem->price_cny);
            }
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

    public function setOrderStatus($status)
    {
        $statuses = Status::getOrderStatuses();
        if (property_exists($statuses, $status)) {
            $this->status = $status;
            $this->save();
        } else {
            return response()->json('Данного статуса не существует', 404);
        }
    }

    public function setOrderPaymentStatus($status)
    {
        $statuses = Status::getOrderPaymentStatuses();
        if (property_exists($statuses, $status)) {
            $this->status_payment = $status;
            $this->save();
        } else {
            return response()->json('Данного статуса оплаты не существует', 404);
        }
    }
}
