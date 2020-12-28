<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ContainerWithRelationshipsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|false|string
     */
    public function toArray($request)
    {
        $container = [
                'id' => $this->id,
                'name' => $this->name,
                'status' => $this->status,
                'city' => new CityResource($this->city),
                'identifier' => $this->identifier,
                'orders' => OrderResource::collection($this->orders),
                'sandboxFiles' => SandboxFileResource::collection($this->sandboxFiles),
                'deliveryPrice' => $this->delivery_price,
                'quantityItems' => $this->quantity_order_items,
                'arrivalDate' => strtotime($this->arrival_date),
                'releaseDate' => strtotime($this->release_date),
                'createdAt' => strtotime($this->created_at),
                'updatedAt' => strtotime($this->updated_at),
        ];

        if ($this->checkCargoOrders()) {
            if (Auth::user()->role->access->orders_show_cargo) {
                return $container;
            }
            return (object)[];
        }

        return $container;
    }
}
