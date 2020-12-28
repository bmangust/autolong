<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\OrderItemResource;
use App\Http\Resources\ContainerResource;
use Illuminate\Support\Facades\Auth;

class OrderWithRelationshipsResource extends JsonResource
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
                'price' => (object)['rub' => $this->getOrderSumInRub(),
                        'usd' => $this->getOrderSumInUsd(),
                        'cny' => $this->getOrderSumInCny()],
                'paymentAmount' => $this->payment_amount,
                'paymentAmountRub' => $this->payment_amount_rub,
                'surchargeAmount' => $this->surcharge_amount,
                'surchargeAmountRub' => $this->surcharge_amount_rub,
                'refusalAmount' => $this->refusal_amount,
                'customsAmount' => $this->customs_amount,
                'orderingAmount' => $this->ordering_amount,
                'paymentHistory' => json_decode($this->payment_history, true) ?? [],
                'provider' => new ProviderResource($this->provider),
                'items' => OrderItemResource::collection($this->orderItems()->with('product')->get()),
                'cargo' => $this->cargo,
                'sandboxFiles' => SandboxFileResource::collection($this->sandboxFiles),
                'container' => new ContainerResource($this->container),
                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];

        if ($this->cargo) {
            if (Auth::user()->role->access->orders_show_cargo) {
                $order['baikalTrackerLink'] = $this->baikal_tracker_link;
                $order['baikalTrackerHistory'] = json_decode($this->baikal_tracker_history, true) ?? [];
                return $order;
            }
            return (object)[];
        }

        return $order;
    }
}
