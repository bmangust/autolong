<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CountryWithProvidersResource;
use App\Country;
use Illuminate\Support\Facades\Validator;


class CountryController extends Controller
{
    protected function countryCreateValidator(array $data)
    {
        $messages = [
            'name' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
            'name' => 'название',
        ];

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return response()->json(CountryWithProvidersResource::collection(Country::all()), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Country $country
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Country $country)
    {
        $this->countryCreateValidator($request->all());
        $newCountry = $country->create($country->dashesToSnakeCase($request->all()));
        return response()->json(new CountryWithProvidersResource($newCountry), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        return response()->json(new CountryWithProvidersResource($country), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country)
    {
        $this->countryCreateValidator($request->all());
        $updatedCountry = $country->update($country->dashesToSnakeCase($request->all()));
        return response()->json(new CountryWithProvidersResource($country), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Country $country)
    {
        $country->delete();
        return response()->json([], 204); //Что вернуть?
    }
}
