<?php

namespace App;

use App\Http\Resources\ProductWithRelationshipsResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Product extends Model
{
    use TranslateToSnakeCaseTrait;
    use TranslateHtmlCodesToTagsTrait;
    use SoftDeletes;

    public const IMAGE_DIRECTORY = '/storage/product-images';
    public const SANDBOX_DIRECTORY = '/products/';
    public const PRODUCTS_PUBLISHED_CACHE_KEY = 'publishedProductsAllWIthRelationships';
    public const PRODUCTS_UNPUBLISHED_CACHE_KEY = 'unpublishedProductsAllWIthRelationships';
    public const PRODUCTS_CACHE_TTL = 60 * 60;

    protected $fillable = [
            'image'
    ];

    public function setAboutRuAttribute($value)
    {
        $this->attributes['about_ru'] = $this->cutScriptTagsInText($value);
    }

    public function setAboutEnAttribute($value)
    {
        $this->attributes['about_en'] = $this->cutScriptTagsInText($value);
    }

    public function catalog()
    {
        return $this->belongsTo('App\Catalog');
    }

    public function orderItems()
    {
        return $this->hasMany('App\OrderItem');
    }

    public function provider()
    {
        return $this->belongsTo('App\Provider');
    }

    public function sandboxFiles()
    {
        return $this->morphMany('App\SandboxFile', 'sandbox_filed');
    }

    public function createOrUpdateImage($image)
    {
        if (!is_null($this->image)) {
            $this->deleteImage();
        }
        $path = Storage::disk('main')->putFileAs(self::IMAGE_DIRECTORY, $image, $this->id . '_' . $this->id . '.' . $image->getClientOriginalExtension());
        $this->image = '/' . $path;
        $this->save();
    }

    public function deleteImage()
    {
        Storage::disk('main')->delete($this->image);
        $this->image = null;
        $this->save();
    }

    public function loadImageFromAutolong($link)
    {
        try {
            $image = file_get_contents($link);
        } catch (\Exception $e) {
            $this->image = null;
            $this->save();
            return true;
        }
        $imageName = $this->id . '_' . str_replace(AutolongRuProduct::AUTOLONG_LINK_IMAGE, '', $link);
        file_put_contents($imageName, $image);
        $path = self::IMAGE_DIRECTORY . '/' . $imageName;
        Storage::disk('main')->move($imageName, $path);
        $this->image = $path;
        $this->save();
    }

    public function changePrices($priceCny)
    {
        $exchangeRate = new ExchangeRate();
        $this->price_cny = $priceCny;
        $this->price_rub = $exchangeRate->lastCourse()->rub * $priceCny;
        $this->price_usd = $exchangeRate->lastCourse()->usd * $priceCny;
        $this->save();
    }

    public function getOrders(): array
    {
        $orders = [];
        foreach ($this->orderItems as $item) {
            $orders[] = $item->order;
        }
        return $orders;
    }

    public static function getCacheKey($published): string
    {
        if ($published == 1) {
            $cacheKey = self::PRODUCTS_PUBLISHED_CACHE_KEY;
        } elseif ($published == 0) {
            $cacheKey = self::PRODUCTS_UNPUBLISHED_CACHE_KEY;
        } else {
            throw new HttpException(404, 'Передан неверный параметр');
        }
        return $cacheKey;
    }

    public static function getCachedProductsOrSetProductsToCache($published)
    {
        $cacheKey = self::getCacheKey($published);
        $cachedProducts = Redis::get($cacheKey);

        if ($cachedProducts) {
            $products = json_decode($cachedProducts);
        } else {
            $products = self::setProductsCache($published, $cacheKey);
        }
        return $products;
    }

    public static function setProductsCache($published, string $cacheKey)
    {
        $products = ProductWithRelationshipsResource::collection(Product::withoutTrashed()
                ->wherePublished($published)
                ->with([
                        'provider',
                        'provider.country',
                        'catalog.tags',
                        'sandboxFiles',
                        'orderItems.order.orderItems.product',
                        'orderItems.order.city',
                ])->orderByDesc('created_at')->get());
        Redis::set($cacheKey, json_encode($products), 'EX', self::PRODUCTS_CACHE_TTL);
        return $products;
    }

    public function renameImageFile(string $imageName, bool $saveDB = true): ?string
    {
        if (Storage::disk('main')->exists($this->image)) {
            $extensionImage = '.' . pathinfo($this->image)['extension'];
            $name = $imageName . $extensionImage;
            $newPath = Product::IMAGE_DIRECTORY . '/' . $name;
            Storage::disk('main')->move($this->image, $newPath);
            if ($saveDB) {
                $this->update([
                        'image' => $newPath
                ]);
            }
            return $newPath;
        }
        return null;
    }

}
