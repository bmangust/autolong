<?php

namespace App;

use App\Http\Resources\ProviderWithRelationshipsResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Redis;

class Provider extends Model
{
    use TranslateToSnakeCaseTrait;
    use SoftDeletes;

    public const SANDBOX_DIRECTORY = '/providers/';
    public const PROVIDERS_CACHE_KEY = 'providers';
    public const PROVIDERS_CACHE_TTL = 60 * 60;

    protected $fillable = [
            'name',
            'name_company',
            'email',
            'website',
            'unscrupulous',
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
            'beneficiary_name',
            'manufacturer'
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

    public function sandboxFiles()
    {
        return $this->morphMany('App\SandboxFile', 'sandbox_filed');
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

    public static function getCachedProvidersOrSetProvidersToCache()
    {
        $cacheKey = self::PROVIDERS_CACHE_KEY;
        $cachedProviders = Redis::get($cacheKey);

        if ($cachedProviders) {
            $providers = json_decode($cachedProviders);
        } else {
            $providers = self::setProvidersCache();
        }
        return $providers;
    }

    public static function setProvidersCache(string $cacheKey = self::PROVIDERS_CACHE_KEY)
    {
        $providers = ProviderWithRelationshipsResource::collection(self::withoutTrashed()
                ->with([
                        'catalogs.tags',
                        'country',
                        'products',
                        'sandboxFiles',
                        'orders.orderItems',
                        'orders.orderItems.product',
                        'orders.city'
                ])
                ->orderBy('name', 'asc')->get());
        Redis::set($cacheKey, json_encode($providers), 'EX', self::PROVIDERS_CACHE_TTL);
        return $providers;
    }
}
