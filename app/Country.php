<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use TranslateToSnakeCaseTrait;
    use TranslationIntoCaseCyrillicTrait;

    protected $fillable = ['name'];

    public function providers()
    {
        return $this->hasMany('App\Provider');
    }
}
