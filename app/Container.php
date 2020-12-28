<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Container extends Model
{
    use TranslateToSnakeCaseTrait;

    protected $fillable = [
            'name',
            'status',
            'city',
            'identifier',
            'arrival_date',
            'release_date',
            'delivery_rice'
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

    public static function getByIdentifier(string $identifier)
    {
        return self::whereIdentifier($identifier)->first();
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
        $statuses = (array)Status::getContainerStatuses();
        $statusContainerInStock = head(array_keys($statuses, "На складе"));
        if (array_key_exists($status, $statuses)) {
            $this->status = $status;
            $status == $statusContainerInStock ? $this->arrival_date = Carbon::now()->toDateString() : $this->arrival_date = null;
            $this->save();
        } else {
            throw new HttpException(404, 'Данного статуса контейнера не существует');
        }
    }

    public function compareOrderCityAndChooseCity(array $ordersIds)
    {
        $mainCity = Order::findOrFail(head($ordersIds))->city;
        if (is_null($mainCity)) {
            throw new HttpException(400, 'В выбранном заказе не указан город');
        }
        foreach ($ordersIds as $id) {
            $city = Order::findOrFail($id)->city;
            if ($mainCity == $city) {
                continue;
            }
            throw new HttpException(400, 'Города в заказах отличаются');
        }
        return $mainCity->id;
    }

    public function changeStatusInOrders($status): bool
    {
        foreach ($this->orders as $order) {
            $order->setOrderStatus($status);
        }
        return true;
    }

    public function checkCargoOrders(): bool
    {
        foreach ($this->orders as $order) {
            if ($order->cargo) {
                return true;
            }
        }
        return false;
    }
}
