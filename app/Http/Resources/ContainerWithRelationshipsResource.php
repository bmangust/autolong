<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContainerWithRelationshipsResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'city' => new CityResource($this->city),
            'orders' => OrderResource::collection($this->orders),
            'sandboxFiles' => SandboxFileResource::collection($this->sandboxFiles),
            'quantityItems' => $this->quantity_order_items,
            'arrivalDate' => strtotime($this->arrival_date),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
