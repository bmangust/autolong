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

    public function store(Request $request)
    {
        $city = City::create([
            'name' => City::translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords($request->input('name'))
        ]);
        return response()->json(new CityResource($city), 201);
    }

    public function destroy(City $city)
    {
        $city->delete();
        return response()->json([], 204);
    }
}
