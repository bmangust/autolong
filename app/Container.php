<?php

namespace App;

use App\Http\Resources\ContainerResource;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = [
        'name',
        'status',
        'city'
    ];

    public const SANDBOX_DIRECTORY = '/container/';

    public function documents()
    {
        return $this->belongsToMany('App\Document', 'container_document', 'container_id', 'document_id')
            ->withTimestamps();
    }
}
