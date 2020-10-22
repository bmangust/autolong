<?php

namespace App;

use App\Http\Resources\ProductResource;
use Illuminate\Database\Eloquent\Model;

class AutolongRuProduct extends Model
{
    protected $table = 'autolong_ru';

    public function checkNumberCodesInDB($numbers): array
    {
        $availableProducts = [];
        foreach ($numbers as $number) {
            $usProduct = Product::whereAutolongNumber($number);
            $product = $this->whereNumber($number)->first();
            if ($usProduct->exists()) {
                $availableProducts[] = new ProductResource($usProduct->first());
            } elseif (!is_null($product) && $product != '') {
                $availableProducts[] = $product;
            } else {
                $availableProducts[] = ['number' => $number];
            }
        }
        return $availableProducts;
    }
}
