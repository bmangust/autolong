<?php

namespace App\Http\Resources;

use App\Connections\Sandbox1c;
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

        $this->product->code_from_1c =
                Sandbox1c::getProduct1cId($this->product->autolong_number) ??
                Sandbox1c::getCode_1C($this->product->autolong_number);

        return [
                'id' => $this->id,
                'productId' => $this->product_id,
                'nameRu' => $this->product->name_ru,
                'orderId' => $this->order_id,
                'quantity' => $this->quantity,
                'autolongNumber' => $this->product->code_from_1c ?? $this->product->autolong_number,
                'price' => (object)[
                        'rub' => $this->price_rub,
                        'usd' => $this->price_usd,
                        'cny' => $this->price_cny
                ],
                'image' => $this->product->image,
                'pcsCtnCtns' => json_decode($this->pcs_ctn_ctns, true),
                'meas' => json_decode($this->meas, true) ?? [],
                'fullPrice' => (object)[
                        'rub' => $this->getSumInRub(),
                        'usd' => $this->getSumInUsd(),
                        'cny' => $this->getSumInCny()
                ],
                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
