<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CatalogResource;
use App\Http\Resources\OrderItemResource;
use App\Http\Resources\ProviderResource;
use phpDocumentor\Reflection\Types\Object_;

class ProductWithRelationshipsResource extends JsonResource
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
            'nameRu' => $this->name_ru,
            'nameEn' => $this->name_en,
            'aboutRu' => $this->about_ru,
            'aboutEn' => $this->about_en,
            'provider' => new ProviderResource($this->provider),
            'image' => $this->image,
            'price' => (object)['rub' => $this->price_rub, 'usd' => $this->price_usd, 'cny' => $this->price_cny],
            'weightNetto' => $this->weight_netto,
            'weightBrutto' => $this->weight_brutto,
            'catalog' => new CatalogResource($this->catalog),
            'vendorCode' => $this->vendor_code,
            'autolongNumber' => $this->autolong_number,
            'documents' => DocumentResource::collection($this->documents),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
