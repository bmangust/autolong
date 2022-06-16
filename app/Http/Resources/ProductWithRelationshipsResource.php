<?php

namespace App\Http\Resources;

use App\Connections\Sandbox1c;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CatalogResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ProviderResource;

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
        $this->code_from_1c = $this->autolong_number ? Sandbox1c::getCode_1C($this->autolong_number) : null;

        return [
                'id' => $this->id,
                'id1c' => $this->id_1c ?? null,
                'nameRu' => $this->name_ru,
                'nameEn' => $this->name_en,
                'aboutRu' => $this->about_ru,
                'aboutEn' => $this->about_en,
                'published' => $this->published,
                'provider' => new ProviderResource($this->provider),
                'image' => $this->image,
                'price' => (object)['rub' => $this->price_rub, 'usd' => $this->price_usd, 'cny' => $this->price_cny],
                'weightNetto' => $this->weight_netto,
                'weightBrutto' => $this->weight_brutto,
                'catalog' => new CatalogResource($this->catalog),
                'vendorCode' => $this->vendor_code,
                'autolongNumber' => $this->code_from_1c ?? $this->autolong_number,
                'autolong_number' => $this->autolong_number,
                'hsCode' => $this->hs_code,
                'sandboxFiles' => SandboxFileResource::collection($this->sandboxFiles),
                'orders' => OrderResource::collection($this->getOrders()),
                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
