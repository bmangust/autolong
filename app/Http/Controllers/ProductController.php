<?php

namespace App\Http\Controllers;

use App\AutolongRuProduct;
use App\Connections\Sandbox1c;
use App\ExchangeRate;
use App\Http\Resources\ProductWithRelationshipsResource;
use App\Log;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ProductController extends Controller
{
    protected function productCreateValidator(array $data)
    {
        $messages = [
                'required' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
                'nameRu' => 'название продукта',
                'priceCny' => 'цена в юань',
                'autolongNumber' => 'внутренний номер',
                'providerId' => 'поставщик'
        ];

        return Validator::make($data, [
                'nameRu' => ['required'],
                'priceCny' => ['required'],
                'autolongNumber' => ['required'],
                'providerId' => ['required'],
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::getCachedProductsOrSetProductsToCache(1);
        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param ExchangeRate $exchangeRate
     * @return void
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, ExchangeRate $exchangeRate)
    {
        $product = new Product();
        if ($request->has('published') && $request->input('published')) {
            $this->productCreateValidator($request->all())->validate();
            $published = $request->input('published');
        }
        if (is_numeric($request->input('providerId'))) {
            $product->provider_id = $request->input('providerId');
        }
        $product->name_ru = $request->input('nameRu');
        $product->name_en = $request->input('nameEn');
        $product->about_ru = $request->input('aboutRu');
        $product->about_en = $request->input('aboutEn');
        $product->published = $published ?? 0;
        $priceCny = $request->input('priceCny');
        $product->price_cny = $priceCny ?? 0;
        $product->price_rub = round($exchangeRate->lastCourse()->rub * $priceCny, 2);
        $product->price_usd = round($exchangeRate->lastCourse()->usd * $priceCny, 2);
        $product->weight_netto = $request->input('weightNetto');
        $product->weight_brutto = $request->input('weightBrutto');
        $product->hs_code = $request->input('hsCode') ?? 0;
        $product->vendor_code = $request->input('vendorCode');
        $product->autolong_number = $request->input('autolongNumber');
        $product->save();
        Log::$write = false;
        if ($request->has('image') && $request->hasFile('image')) {
            $product->createOrUpdateImage($request->file('image'));
        } elseif (is_string($request->input('image'))) {
            $product->loadImageFromAutolong($request->input('image'));
        }
        return response()->json(new ProductWithRelationshipsResource($product), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json(new ProductWithRelationshipsResource($product), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Product $product
     * @param ExchangeRate $exchangeRate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product, ExchangeRate $exchangeRate)
    {
        if ($product->published) {
            $this->productCreateValidator($request->all())->validate();
        }
        $product->name_ru = $request->input('nameRu');
        $product->name_en = $request->input('nameEn');
        $product->about_ru = $request->input('aboutRu');
        $product->about_en = $request->input('aboutEn');
        $product->provider_id = $request->input('providerId');
        $priceCny = $request->input('priceCny');
        $product->price_cny = $priceCny;
        $product->price_rub = round($exchangeRate->lastCourse()->rub * $priceCny, 2);
        $product->price_usd = round($exchangeRate->lastCourse()->usd * $priceCny, 2);
        $product->weight_netto = $request->input('weightNetto');
        $product->weight_brutto = $request->input('weightBrutto');
        $product->vendor_code = $request->input('vendorCode');
        $product->autolong_number = $request->input('autolongNumber');
        $product->hs_code = $request->input('hsCode') ?? 0;
        $product->save();
        return response()->json(new ProductWithRelationshipsResource($product), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        Log::$write = false;
        $product->deleteImage();
        Log::$write = true;
        $product->delete();
        return response()->json([], 204);
    }

    public function checkNumberCode(Request $request, AutolongRuProduct $autolongRuProduct)
    {
        $request->validate([
                'numbers' => 'required'
        ]);
        $numbers = $autolongRuProduct->cleanSpaceInArrayItems($request->input('numbers'));
        $availableProducts = $autolongRuProduct->checkNumberCodesInDB($numbers, $request->input('published'));
        return response()->json($availableProducts, 200);
    }

    public function updateImage(Request $request, Product $product)
    {
        $request->validate([
                'image' => 'required|file'
        ]);
        $product->createOrUpdateImage($request->file('image'));
        return response()->json($product->image, 200);
    }

    public function indexUnpublished()
    {
        $products = Product::getCachedProductsOrSetProductsToCache(0);
        return response()->json($products, 200);
    }

    public function publish(Product $product)
    {
        if (is_null($product->provider_id)) {
            throw new HttpException(400, 'Необходимо указать поставщика перед внесением в основную базу.');
        }
        $product->published = 1;
        $autolongNumber = Sandbox1c::getBiggestAutolongNumber();
        $product->autolong_number = $autolongNumber;
        $product->image = $product->renameImageFile($autolongNumber . '_1', false);
        $product->save();
        response()->json(new ProductWithRelationshipsResource($product), 200);
    }

    public function indexVendorCode(Request $request)
    {
        $request->validate([
                'vendorCode' => 'required',
                'isAutolongNumber' => 'required'
        ]);
        $code = $request->input('vendorCode');
        if ($request->input('isAutolongNumber')) {
            $products = ProductWithRelationshipsResource::collection(Product::withoutTrashed()
                    ->whereAutolongNumber($code)
                    ->with([
                            'provider',
                            'provider.country',
                            'catalog.tags',
                            'sandboxFiles',
                            'orderItems.order.orderItems.product',
                            'orderItems.order.city',
                            'orderItems.order.container',
                    ])
                    ->orderBy('created_at', 'asc')
                    ->get());
        } else {
            $products = ProductWithRelationshipsResource::collection(Product::withoutTrashed()
                    ->whereVendorCode($code)
                    ->with([
                            'provider',
                            'provider.country',
                            'catalog.tags',
                            'sandboxFiles',
                            'orderItems.order.orderItems.product',
                            'orderItems.order.city',
                            'orderItems.order.container',
                    ])
                    ->orderBy('created_at', 'asc')
                    ->get());
        }
        return response()->json($products , 200);
    }
}
