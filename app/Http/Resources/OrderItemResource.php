<?php

namespace App\Http\Resources;

use App\ExchangeRate;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $exchangeRate = new ExchangeRate();
        return [
            'id' => $this->id,
            'productId' => $this->product_id,
            'nameRu' => $this->product->name_ru,
            'orderId' => $this->order_id,
            'quantity' => $this->quantity,
            'price' => (Object)['rub' => $this->price_rub,
                                'usd' => $this->price_usd,
                                'cny' => $this->price_cny],
            'image' => $this->product->image,
            'fullPriceCny' => $this->getSumInCny(),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
