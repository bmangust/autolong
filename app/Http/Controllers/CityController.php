<?php

namespace App\Http\Controllers;

use App\City;
use App\Http\Resources\CityResource;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        return response()->json(CityResource::collection(City::all()->sortByDesc('name')), 200);
    }

    public function store(Request $request, City $city)
    {
        $city = $city->create($request->all());
        return response()->json(new CityResource($city), 201);
    }
}
