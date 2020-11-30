<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use TranslationIntoCaseCyrillicTrait;
    use SoftDeletes;

    protected $fillable = ['name'];

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function containers()
    {
        return $this->hasMany('App\Container');
    }
}
