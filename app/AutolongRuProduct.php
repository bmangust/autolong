<?php

namespace App;

use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Model;

class AutolongRuProduct extends Model
{
    protected $table = 'autolong_ru';

    public function checkNumberCodesInDB($numbers)
    {
        $availableProducts = [];
        foreach ($numbers as $number) {
            $usProduct = Product::whereAutolongNumber($number);
            $product = $this->whereNumber($number)->first();
            if ($usProduct->exists()) {
                array_push($availableProducts,  new ProductResource($usProduct->first()));
            } elseif(!is_null($product) && $product != '') {
                array_push($availableProducts,  $product);
            } else {
                array_push($availableProducts, $number);
            }
        }
        return $availableProducts;
    }
}
