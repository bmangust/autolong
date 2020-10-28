<?php

namespace App\Http\Resources;

use App\ExchangeRate;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ProductResource;


class OrderItemWithRelationshipsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $exchangeRate = new ExchangeRate();
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'price' => (Object)['rub' => $this->price_rub,
                                'usd' => $this->price_usd,
                                'cny' => $this->price_cny],
            'fullPriceCny' => $this->getSumInCny(),
            'order' => new OrderResource($this->order),
            'product' => new ProductResource($this->order),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
