<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'arrivalDate' => $this->arrivale_date,
            'city' => new CityResource($this->city),
            'statusPayment' => $this->status_payment,
            'providerId' => $this->provider_id,
            'items' => OrderItemResource::collection($this->orderItems),
            'price' => (object)['rub' => $this->getOrderSumInRub(),
                                'usd' => $this->getOrderSumInUsd(),
                                'cny' => $this->getOrderSumInCny()],
            'cargo' => $this->cargo,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
