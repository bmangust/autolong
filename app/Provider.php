<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provider extends Model
{
    use TranslateToSnakeCaseTrait;
    use SoftDeletes;

    public const SANDBOX_DIRECTORY = '/providers/';

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

    public function documents()
    {
        return $this->morphMany('App\Document', 'documented');
    }

    public function addOrUpdateCatalogs($catalogs)
    {
        if ($this->catalogs()->count()) {
            $this->catalogs()->update(['provider_id' => null]);
        }
        foreach ($catalogs as $id) {
            $catalog = Catalog::findOrFail($id);
            $this->catalogs()->save($catalog);
        }
    }
}
