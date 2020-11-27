<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\CountryWithRelationshipsResource;
use App\Country;
use Illuminate\Support\Facades\Validator;


class CountryController extends Controller
{
    protected function countryCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
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
        return response()->json(CountryWithRelationshipsResource::collection(Country::all()), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Country $country
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->countryCreateValidator($request->all())->validate();
        $name = Country::translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords($request->input('name'));
        $newCountry = Country::create(['name' => $name]);
        return response()->json(new CountryWithRelationshipsResource($newCountry), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        return response()->json(new CountryWithRelationshipsResource($country), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country)
    {
        $this->countryCreateValidator($request->all())->validate();
        $name = Country::translateUcFirstCyrillicAndOtherLcWhenStingHaveManyWords($request->input('name'));
        $country->update(['name' => $name]);
        return response()->json(new CountryWithRelationshipsResource($country), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Country $country)
    {
        $country->delete();
        return response()->json([], 204);
    }
}
