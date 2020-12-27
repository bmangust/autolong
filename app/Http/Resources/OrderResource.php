<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|false|string
     */
    public function toArray($request)
    {
        $order = [
                'id' => $this->id,
                'name' => $this->name,
                'status' => $this->status,
                'arrivalDate' => $this->arrival_date,
                'city' => new CityResource($this->city),
                'statusPayment' => $this->status_payment,
                'packingList' => $this->checkDataForPackingList(),
                'providerId' => $this->provider_id,
                'items' => OrderItemResource::collection($this->orderItems),
                'paymentAmount' => $this->payment_amount,
                'surchargeAmount' => $this->surcharge_amount,
                'paymentHistory' => json_decode($this->payment_history, true) ?? [],
                'price' => (object)['rub' => $this->getOrderSumInRub(),
                        'usd' => $this->getOrderSumInUsd(),
                        'cny' => $this->getOrderSumInCny()],
                'cargo' => $this->cargo,
                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];

        if ($this->cargo) {
            if (Auth::user()->role->access->orders_show_cargo) {
                $order['baikal_tracker_link'] = $this->baikal_tracker_link;
                $order['baikal_tracker_history'] = json_decode($this->baikal_tracker_history, true) ?? [];
                return $order;
            }
            return (object)[];
        }
        return $order;
    }
}
