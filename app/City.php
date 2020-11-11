<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use TranslationIntoCaseCyrillicTrait;

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
