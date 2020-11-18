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
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'nameRu' => $this->product->name_ru,
            'autolongNumber' => $this->product->autolong_number,
            'price' => (object)['rub' => $this->price_rub,
                                'usd' => $this->price_usd,
                                'cny' => $this->price_cny],
            'fullPrice' => (object)['rub' => $this->getSumInRub(),
                                    'usd' => $this->getSumInUsd(),
                                    'cny' => $this->getSumInCny()],
            'order' => new OrderResource($this->order),
            'product' => new ProductResource($this->product),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
