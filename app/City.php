<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use TranslationIntoCaseCyrillicTrait;

    protected $fillable = ['name'];

    protected static function booted()
    {
        static::deleting(function (City $city) {
            $city->orders()->update(['city_id' => null]);
            $city->containers()->update(['city_id' => null]);
        });
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function containers()
    {
        return $this->hasMany('App\Container');
    }
}
