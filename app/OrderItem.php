<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use TranslateToSnakeCaseTrait;
    use TranslateHtmlCodesToTagsTrait;

    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function product()
    {
        return $this->belongsTo('App\Product')->withTrashed();
    }

    public function getSumInCny()
    {
        return $this->price_cny * $this->quantity;
    }

    public function getSumInRub()
    {
        return $this->price_rub * $this->quantity;
    }

    public function getSumInUsd()
    {
        return $this->price_usd * $this->quantity;
    }

    public function fullWeightNettoOrderItem()
    {
        return $this->quantity * $this->product->weight_netto;
    }

    public function fullWeightBruttoOrderItem()
    {
        return $this->quantity * $this->product->weight_brutto;
    }

    public function getVolumeBox()
    {
        return array_product(json_decode($this->meas));
    }
}
