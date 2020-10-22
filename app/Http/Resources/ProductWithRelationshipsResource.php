<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CatalogResource;
use App\Http\Resources\OrderItemResource;
use phpDocumentor\Reflection\Types\Object_;

class ProductWithRelationshipsResource extends JsonResource
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
            'nameRu' => $this->name_ru,
            'nameEn' => $this->name_en,
            'aboutRu' => $this->about_ru,
            'aboutEn' => $this->about_en,
            'providerId' => new ProviderResource($this->provider_id),
            'image' => $this->image,
            'price' => (Object)['rub' => $this->price_rub, 'usd' => $this->price_usd, 'cny' => $this->price_cny],
            'weightNetto' => $this->weight_netto,
            'weightBrutto' => $this->weight_brutto,
            'catalog' => new CatalogResource($this->catalog),
            'orderItems' => OrderItemResource::collection($this->orderitems),
            'vendorCode' => $this->vendor_code,
            'autolongNumber' => $this->autolong_number,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
