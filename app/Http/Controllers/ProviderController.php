<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;
use App\Http\Resources\ProviderWithRelationshipsResource;
use App\Provider;
use Illuminate\Support\Facades\Validator;

class ProviderController extends Controller
{
    protected function providerCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
            'name' => 'имя поставщика',
            'nameCompany' => 'название компании',
        ];

        return Validator::make($data, [
            'name' => ['required'],
            'nameCompany' => ['required'],
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(ProviderWithRelationshipsResource::collection(Provider::withoutTrashed()->orderBy('name', 'asc')->get(), 200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Provider $provider
     * @return void
     */
    public function store(Request $request, Provider $provider)
    {
        $this->providerCreateValidator($request->all())->validate();
        $newProvider = $provider->create($provider->dashesToSnakeCase($request->all()));
        Log::$write = false;
        $newProvider->addOrUpdateCatalogs($request->input('catalogs'));
        return response()->json(new ProviderWithRelationshipsResource($newProvider), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Provider $provider
     * @return \Illuminate\Http\Response
     */
    public function show(Provider $provider)
    {
        return response()->json(new ProviderWithRelationshipsResource($provider), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Provider $provider
     * @return void
     */
    public function update(Request $request, Provider $provider)
    {
        $this->providerCreateValidator($request->all())->validate();
        $provider->update($provider->dashesToSnakeCase($request->all()));
        Log::$write = false;
        $provider->addOrUpdateCatalogs($request->input('catalogs'));
        return response()->json(new ProviderWithRelationshipsResource($provider), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Provider $provider
     * @return \Illuminate\Http\Response
     */
    public function destroy(Provider $provider)
    {
        $provider->delete();
        return response()->json([], 204);
    }

    public function setBlackLabel(Request $request, Provider $provider)
    {
        $request->validate([
            'unscrupulous' => 'required|integer|min:0|max:1'
        ]);
        $provider->unscrupulous = $request->input('unscrupulous');
        $provider->save();
        return response()->json(new ProviderWithRelationshipsResource($provider), 200);
    }
}
