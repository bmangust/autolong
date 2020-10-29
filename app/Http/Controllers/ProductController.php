<?php

namespace App\Http\Controllers;

use App\AutolongRuProduct;
use App\ExchangeRate;
use Illuminate\Http\Request;
use App\Http\Resources\ProductWithRelationshipsResource;
use App\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    protected function productCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
            'nameRu' => 'название продукта',
            'aboutRu' => 'о продукте',
            'priceCny' => 'цена в юань',
            'weightNetto' => 'вес в нет то',
            'weightBrutto' => 'вес в брутто',
            'vendorCode' => 'артикул',
            'autolongNumber' => 'номер в 1с',
            'providerId' => 'поставщик'
        ];

        return Validator::make($data, [
            'nameRu' => ['required'],
            'aboutRu' => ['required'],
            'priceCny' => ['required'],
            'weightNetto' => ['required'],
            'weightBrutto' => ['required'],
            'vendorCode' => ['required'],
            'autolongNumber' => ['required'],
            'providerId' => ['required'],
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(ProductWithRelationshipsResource::collection(Product::all()->sortByDesc('updated_at'), 200));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Product $product
     * @return void
     */
    public function store(Request $request,ExchangeRate $exchangeRate)
    {
        $this->productCreateValidator($request->all())->validate();
        $product = new Product();
        $product->name_ru = $request->input('nameRu');
        $product->name_en = $request->input('nameEn');
        $product->about_ru = $request->input('aboutRu');
        $product->about_en = $request->input('aboutEn');
        $product->provider_id = $request->input('providerId');
        $product->price_cny = $request->input('priceCny');
        $product->price_rub = $request->input('priceRub');
        $product->price_usd = $request->input('priceUsd');
        $product->weight_netto = $request->input('weightNetto');
        $product->weight_brutto = $request->input('weightBrutto');
        $product->vendor_code = $request->input('vendorCode');
        $product->autolong_number = $request->input('autolongNumber');
        $product->save();
        if ($request->has('image') && $request->hasFile('image')){
            $product->createOrUpdateImage($request->file('image'));
        } elseif ($request->has('image') && is_string($request->input('image'))) {
            $product->loadImageFromAutolong($request->input('image'));
        }
        return response()->json(new ProductWithRelationshipsResource($product), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json(new ProductWithRelationshipsResource($product), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product, ExchangeRate $exchangeRate)
    {
        $product->name_ru = $request->input('nameRu');
        $product->name_en = $request->input('nameEn');
        $product->about_ru = $request->input('aboutRu');
        $product->about_en = $request->input('aboutEn');
        $product->provider_id = $request->input('providerId');
        $product->price_cny = $request->input('priceCny');
        $product->price_rub = $request->input('priceRub');
        $product->price_usd = $request->input('priceUsd');
        $product->weight_netto = $request->input('weightNetto');
        $product->weight_brutto = $request->input('weightBrutto');
        $product->vendor_code = $request->input('vendorCode');
        $product->autolong_number = $request->input('autolongNumber');
        $product->save();
        if ($request->has('image') && $request->hasFile('image')){
            $product->createOrUpdateImage($request->file('image'));
        } elseif ($request->has('image') && is_string($request->input('image'))) {
            $product->loadImageFromAutolong($request->input('image'));
        }
        return response()->json(new ProductWithRelationshipsResource($product), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->deleteImage();
        $product->delete();
        return response()->json([], 204);
    }

    public function checkNumberCode(Request $request, AutolongRuProduct $autolongRuProduct)
    {
        $request->validate([
            'numbers' => 'required'
        ]);
        $numbers = $request->input('numbers');
        $availableProducts = $autolongRuProduct->checkNumberCodesInDB($numbers);
        return response()->json($availableProducts, 200);
    }
}
