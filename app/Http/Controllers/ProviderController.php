<?php

namespace App\Http\Controllers;

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
            'max' => 'Поле :attribute должно содержать не более :max символов',
        ];

        $names = [
            'name' => 'имя поставщика',
            'nameCompany' => 'название компании',
            'beneficiaryName' => 'имя получателя',
            'beneficiaryAccountName' => 'название счета получателя',
            'beneficiaryBankAddress' => 'адрес банка получателя',
            'beneficiaryAddress' => 'адрес получателя',
            'beneficiaryBankName' => 'название банка получателя',
            'beneficiaryBankCode' => 'код банка получателя',
            'beneficiarySwiftAddress' => 'SWIFT адрес'
        ];

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'nameCompany' => ['required', 'string', 'max:255'],
            'beneficiaryName' => ['required', 'string', 'max:255'],
            'beneficiaryAccountName' => ['required', 'string', 'max:255'],
            'beneficiaryBankAddress' => ['required', 'string', 'max:255'],
            'beneficiaryAddress' => ['required', 'string', 'max:255'],
            'beneficiaryBankName' => ['required', 'string', 'max:255'],
            'beneficiaryBankCode' => ['required', 'string', 'max:255'],
            'beneficiarySwiftAddress' => ['required']
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(ProviderWithRelationshipsResource::collection(Provider::all()->sortBy('name'), 200));
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
}
