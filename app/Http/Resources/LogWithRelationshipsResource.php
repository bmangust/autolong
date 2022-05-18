<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LogWithRelationshipsResource extends JsonResource
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
            'user' => !is_null($this->user) ? $this->user->getFullName() : '',
            'role' => !is_null($this->user) ? $this->user->role->name : '',
            'action' => $this->action,
            'model' => $this->model,
            'modelName' => $this->model_name,
            'before' => $this->before,
            'after' => $this->after,
            'createdAt' => strtotime($this->created_at),
            'updatedAt' => strtotime($this->updated_at),
        ];
    }
}
