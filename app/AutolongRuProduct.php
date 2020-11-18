<?php

namespace App;

use App\Http\Resources\AutolongRuProductResource;
use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Model;

class AutolongRuProduct extends Model
{
    use CleaningSpaceTrait;
    use TranslateHtmlCodesToTagsTrait;

    protected $table = 'autolong_ru';

    public const AUTOLONG_LINK_IMAGE = "https://autolong.ru/images/products/thumb/";

    public function getPhotoAttribute()
    {
        return (self::AUTOLONG_LINK_IMAGE . $this->attributes['photo']);
    }

    public function getTextAttribute()
    {
        $string = $this->translateHtmlCodesToTags($this->attributes['text']);
        return preg_replace('#<iframe.*<\/iframe>#', '', $string);
    }

    public function getArticulAttribute()
    {
        return $this->translateHtmlCodesToTags($this->attributes['articul']);
    }

    public function checkNumberCodesInDB($numbers): array
    {
        $availableProducts = [];
        foreach ($numbers as $number) {
            $usProduct = Product::whereAutolongNumber($number);
            $product = $this->whereNumber($number)->first();
            if ($usProduct->exists()) {
                $availableProducts[] = new ProductResource($usProduct->first());
            } elseif (!is_null($product) && $product != '') {
                $availableProducts[] = new AutolongRuProductResource($product);
            } else {
                $availableProducts[] = ['number' => $number];
            }
        }
        return $availableProducts;
    }
}
