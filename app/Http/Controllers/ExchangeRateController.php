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
    	$course = new ExchangeRateResource($exchangeRate->lastCourse());
    	$course['rub'] = $course['rub'] / 10;
    	$course['usd'] = $course['usd'] / 10;
        return response()->json($course);
    }
}
