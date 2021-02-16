<?php

namespace App;

use App\Connections\OldAutolongDatabase;
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

    public function getNameAttribute()
    {
        return $this->translateHtmlCodesToTags($this->attributes['name']);
    }

    public function checkNumberCodesInDB($numbers, int $published = 1): array
    {
        $availableProducts = ['products' => []];
        foreach ($numbers as $number) {
            $usProduct = Product::whereAutolongNumber($number);
            $product = OldAutolongDatabase::findByNumber($number);
            if ($usProduct->exists()) {
                if (!$published && $usProduct->first()->published) {
                    array_key_exists('published', $availableProducts) ?: $availableProducts['published'] = [];
                    $availableProducts['published'][] = $number;
                } else {
                    $availableProducts['products'][] = new ProductResource($usProduct->first());
                }
            } elseif (!is_null($product) && $product != '') {
                $availableProducts['products'][] = new AutolongRuProductResource($product);
            } else {
                $availableProducts['products'][] = (object)['number' => $number];
            }
        }
        return $availableProducts;
    }
}
