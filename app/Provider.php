<?php

namespace App;

use App\Http\Resources\ProviderResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provider extends Model
{
    use TranslateToSnakeCase;
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

    protected static function booted()
    {
        static::created(function (Provider $provider) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => json_encode(new ProviderResource($provider)),
                    'model_name' => get_class($provider)
                ]);
            }
        });

        static::updated(function (Provider $provider) {
            if (Log::$write) {
                $log = new Log();
                $before = $provider->getOriginal();
                $after = $provider->toArray();
                $log->create([
                    'action' => Log::ACTION_UPDATED,
                    'model' => json_encode(new ProviderResource($provider)),
                    'model_name' => get_class($provider),
                    'before' => json_encode(array_diff($before, $after)),
                    'after' => json_encode(array_diff($after, $before)),
                ]);
            }
        });

        static::deleted(function (Provider $provider){
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_DELETED,
                    'model' => json_encode(new ProviderResource($provider)),
                    'model_name' => get_class($provider)
                ]);
            }
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

    public function documents()
    {
        return $this->belongsToMany('App\Document', 'document_provider', 'provider_id', 'document_id')
            ->withTimestamps();
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
