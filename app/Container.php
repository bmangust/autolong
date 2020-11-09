<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use TranslateToSnakeCaseTrait;

    protected $fillable = [
        'name',
        'status',
        'city'
    ];

    public const SANDBOX_DIRECTORY = '/container/';

    public function documents()
    {
        return $this->morphMany('App\Document', 'documented');
    }
}
