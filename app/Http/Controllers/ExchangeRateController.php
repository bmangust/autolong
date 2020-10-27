<?php

namespace App\Http\Controllers;

use App\ExchangeRate;
use App\Http\Resources\ExchangeRateResource;
use Illuminate\Http\Request;

class ExchangeRateController extends Controller
{
    public function getLastCourse(ExchangeRate $exchangeRate)
    {
        return response()->json(new ExchangeRateResource($exchangeRate->lastCourse()), 200);
    }
}
