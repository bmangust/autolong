<?php

namespace App\Http\Resources;

use App\Connections\Sandbox1c;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'nameRu' => $this->name_ru,
            'nameEn' => $this->name_en,
            'aboutRu' => $this->about_ru,
            'aboutEn' => $this->about_en,
            'published' => $this->published,
            'providerId' => $this->provider_id,
            'image' => $this->image,
            'hsCode' => $this->hs_code,
            'price' => (object)['rub' => $this->price_rub, 'usd' => $this->price_usd, 'cny' => $this->price_cny],
            'weightNetto' => $this->weight_netto,
            'weightBrutto' => $this->weight_brutto,
            'vendorCode' => $this->vendor_code,
            'autolongNumber' => $this->code_from_1c ?? $this->autolong_number,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
