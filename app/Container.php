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
            'delivery_price',
            'quantity_order_items'
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
        $orders = Order::find($ids);
        $foundBaikalIdAssigned = false;
        foreach ($orders as $order) {
            if ($order->cargo && $order->baikal_tracker_link) {
                $baikalId = $order->getBaikalId();
                $container = self::getByIdentifier($baikalId);
                if ($container) {
                    if ($container->city_id != $order->city_id) {
                        throw new HttpException(400, 'У заказа "' . $order->name . '" такой же байкал идентификатор как и у контейнера №' . $container->name . '. Но города различаются. Установите у заказа другой город, либо поменяйте идентификатор.');
                    }
                    $container->orders()->save($order);
                    $container->updateQuantityOrderItems();
                    continue;
                }

                if (!$foundBaikalIdAssigned) {
                    $this->identifier = $baikalId;
                    $this->save();
                    $foundBaikalIdAssigned = true;
                }
            }
            $this->orders()->save($order);
        }
        if (!$this->orders()->count()) {
            $this->delete();
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
        $orders = Order::find($ordersIds);
        foreach ($orders as $order) {
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

    public function checkCargoOrdersById(array $ids): bool
    {
        $orders = Order::find($ids);
        $status = $orders[0]->cargo;
        foreach ($orders as $order) {
            if ($order->cargo == $status) {
                continue;
            }
            return false;
        }
        return true;
    }

    public function updateQuantityOrderItems()
    {
        $orders = $this->orders()->with('orderItems')->get();
        $quantity = 0;
        foreach ($orders as $order) {
            $quantity += $order->getOrderItemsQuantity();
        }
        $this->update([
                'quantity_order_items' => $quantity
        ]);
    }
}
