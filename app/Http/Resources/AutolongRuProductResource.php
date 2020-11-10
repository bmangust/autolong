<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AutolongRuProductResource extends JsonResource
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
            'number' => $this->number,
            'articul' => $this->articul,
            'name' => $this->name,
            'price' => $this->price,
            'h_price' => $this->h_price,
            'text' => $this->text,
            'photo' => $this->photo
        ];
    }
}
