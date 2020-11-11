<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use TranslateToSnakeCaseTrait;

    protected $fillable = [
        'name',
        'status',
        'city'
    ];

    public const SANDBOX_DIRECTORY = '/container/';

    public function sandboxFiles()
    {
        return $this->morphMany('App\SandboxFile', 'sandbox_filed');
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function addOrders(array $ids): bool
    {
        foreach ($ids as $id) {
            $order = Order::findOrFail($id);
            $this->orders()->save($order);
        }
        return true;
    }

    public function getQuantityOrderItems(array $ordersIds): int
    {
        $quantity = 0;
        foreach ($ordersIds as $id) {
            $order = Order::findOrFail($id);
            foreach ($order->orderItems as $item) {
                $quantity += $item->quantity;
            }
        }
        return $quantity;
    }

    public function setContainerStatus($status)
    {
        $statuses = Status::getContainerStatuses();
        if (property_exists($statuses, $status)) {
            $this->status = $status;
            $this->save();
        } else {
            return response()->json('Данного статуса оплаты не существует', 404);
        }
    }

    public function compareOrderCityAndChooseCity(array $ordersIds)
    {
        $mainCity = Order::findOrFail(head($ordersIds))->city;
        foreach ($ordersIds as $id) {
            $city = Order::findOrFail($id)->city;
            if ($mainCity == $city) {
                continue;
            } else {
                return response()->json('Города в заказах отличаются', 400);
            }
        }
        return $mainCity->id;
    }
}
