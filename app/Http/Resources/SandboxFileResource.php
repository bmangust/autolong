<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SandboxFileResource extends JsonResource
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
            'name' => $this->name,
            'file' => $this->file,
            'description' => $this->description,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
