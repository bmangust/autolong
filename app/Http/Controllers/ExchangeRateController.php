<?php

namespace App\Http\Controllers;

use App\ExchangeRate;
use App\Http\Resources\ExchangeRateResource;

class ExchangeRateController extends Controller
{
    /**
     * Последний актуальный курс
     * @param ExchangeRate $exchangeRate
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLastCourse(ExchangeRate $exchangeRate)
    {
        return response()->json(new ExchangeRateResource($exchangeRate->lastCourse()));
    }
}
