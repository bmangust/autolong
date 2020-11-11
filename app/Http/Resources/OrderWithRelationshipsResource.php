<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProviderResource;
use App\Http\Resources\OrderItemResource;
use App\Http\Resources\ContainerResource;

class OrderWithRelationshipsResource extends JsonResource
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
            'statusPayment' => $this->status_payment,
            'price' => (object)['rub' => $this->getOrderSumInRub(),
                                'usd' => $this->getOrderSumInUsd(),
                                'cny' => $this->getOrderSumInCny()],
            'provider' => new ProviderResource($this->provider),
            'items' => OrderItemResource::collection($this->orderItems),
            'cargo' => $this->cargo,
            'sandboxFiles' => SandboxFileResource::collection($this->sandboxFiles),
            'container' => new ContainerResource($this->container),
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
