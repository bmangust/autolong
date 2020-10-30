<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = [
      'name',
      'name_company',
      'email',
      'website',
      'phone',
      'wechat',
      'country_id',
      'beneficiary_name',
      'beneficiary_address',
      'beneficiary_account_name',
      'beneficiary_bank_address',
      'beneficiary_bank_name',
      'beneficiary_bank_code',
      'beneficiary_swift_address',
      'beneficiary_name'
    ];

    protected static function booted()
    {
        static::deleted(function ($provider) {
            $provider->catalogs()->delete();
        });
    }

    public function catalogs()
    {
        return $this->hasMany('App\Catalog');
    }

    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    public function products()
    {
        return $this->hasMany('App\Product');
    }

}
