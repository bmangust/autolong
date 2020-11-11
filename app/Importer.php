<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Importer extends Model
{
    use TranslateToSnakeCaseTrait;

    public const SANDBOX_DIRECTORY = '/importers/';

    protected $fillable = [
        'name_ru',
        'name_en',
        'address',
        'phone'
    ];

    public function sandboxFiles()
    {
        return $this->morphMany('App\SandboxFile', 'sandbox_filed');
    }
}
