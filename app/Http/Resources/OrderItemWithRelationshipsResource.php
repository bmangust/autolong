<?php

namespace App\Http\Resources;

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
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'price' => (Object)['rub' => $this->product->price_rub,
                                'usd' => $this->product->price_usd,
                                'cny' => $this->product->price_cny],
            'fullPriceCny' => $this->getSum(),
            'order' => new OrderResource($this->order),
            'product' => new ProductResource($this->order),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
