<?php

namespace App\Http\Resources;

use App\Connections\Sandbox1c;
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
 
 	    $this->product->code_from_1c = Sandbox1c::getCode_1C($this->product->autolong_number);
 
        return [
                'id' => $this->id,
                'quantity' => $this->quantity,
                'nameRu' => $this->product->name_ru,
                'autolongNumber' => $this->product->code_from_1c ?? $this->product->autolong_number,
                'price' => (object)[
                        'rub' => $this->price_rub,
                        'usd' => $this->price_usd,
                        'cny' => $this->price_cny
                ],
                'fullPrice' => (object)[
                        'rub' => $this->getSumInRub(),
                        'usd' => $this->getSumInUsd(),
                        'cny' => $this->getSumInCny()
                ],
                'order' => new OrderResource($this->order),
                'pcsCtnCtns' => json_decode($this->pcs_ctn_ctns, true),
                'meas' => json_decode($this->meas, true) ?? [],
                'product' => new ProductResource($this->product),
                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
