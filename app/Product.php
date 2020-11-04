<?php

namespace App;

use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use TranslateToSnakeCase;
    use SoftDeletes;

    public const IMAGE_DIRECTORY = '/storage/product-images';

    protected static function booted()
    {
        static::created(function (Product $product) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => json_encode(new ProductResource($product)),
                    'model_name' => get_class($product)
                ]);
            }
        });

        static::updated(function (Product $product) {
            if (Log::$write) {
                $log = new Log();
                $before = $product->getOriginal();
                $after = $product->toArray();
                $log->create([
                    'action' => Log::ACTION_UPDATED,
                    'model' => json_encode(new ProductResource($product)),
                    'model_name' => get_class($product),
                    'before' => json_encode(array_diff($before, $after)),
                    'after' => json_encode(array_diff($after, $before)),
                ]);
            }
        });

        static::deleted(function (Product $product){
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_DELETED,
                    'model' => json_encode(new ProductResource($product)),
                    'model_name' => get_class($product)
                ]);
            }
        });
    }

    public function setAboutRuAttribute($value) {
        $this->attributes['about_ru'] = preg_replace('#<script.*<\/script>#','', $value);
    }

    public function setAboutEnAttribute($value) {
        $this->attributes['about_en'] = preg_replace('#<script.*<\/script>#','', $value);
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

    public function createOrUpdateImage($image)
    {
        if (!is_null($this->image)) {
            $this->deleteImage();
        }
        $path = Storage::disk('main')->putFileAs(Product::IMAGE_DIRECTORY, $image, $this->id . '_' . $this->id . '.' . $image->getClientOriginalExtension());
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
            return response()->json('Данной картинки не существует', 404);
        }
        $imageName = $this->id . '_' . str_replace(AutolongRuProduct::AUTOLONG_LINK_IMAGE, '', $link);
        file_put_contents($imageName , $image);
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
}
