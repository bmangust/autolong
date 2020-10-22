<?php

namespace App;

use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Model;

class AutolongRuProduct extends Model
{
    protected $table = 'autolong_ru';

    public function checkNumberCodesInDB($numbers)
    {
        $avilableProducts = [];
        foreach ($numbers as $number) {
            $usProduct = Product::whereAutolongNumber($number);
            $product = $this->whereNumber($number)->first();
            if ($usProduct->exists()) {
                array_push($avilableProducts,  new ProductResource($usProduct->first()));
            } elseif(!is_null($product) && $product != '') {
                array_push($avilableProducts,  $product);
            } else {
                array_push($avilableProducts, $number);
            }
        }
        return $avilableProducts;
    }
}
