<?php

namespace App;

use App\Http\Resources\ImporterResource;
use Illuminate\Database\Eloquent\Model;

class Importer extends Model
{
    use TranslateToSnakeCase;
    public const SANDBOX_DIRECTORY = '/importers/';

    protected $fillable = [
      'name_ru',
      'name_en',
      'address',
      'phone'
    ];

    public function documents()
    {
        return $this->belongsToMany('App\Importer', 'document_importer', 'importer_id', 'document_id')
            ->withTimestamps();
    }
};
