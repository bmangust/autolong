<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use TranslateToSnakeCaseTrait;
    use TranslationIntoCaseCyrillicTrait;

    protected static function booted()
    {
        static::deleting(function (Country $country) {
            $country->providers()->update(['country_id' => null]);
        });
    }
    
    protected $fillable = ['name'];

    public function providers()
    {
        return $this->hasMany('App\Provider');
    }
}
