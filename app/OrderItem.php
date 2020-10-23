<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use TranslateToSnakeCase;

    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function product()
    {
        return $this->belongsTo('App\Product');
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
}
