<?php

namespace App\Http\Controllers;

use App\Connections\Sandbox1c;
use App\Services\OzonService;

final class OzonController extends Controller
{
    /**
     * @var OzonService
     */
    private $ozonService;

    public function __construct(OzonService $ozonService)
    {
        $this->ozonService = $ozonService;
    }

    public function getOzonGoodsStocks()
    {
        $products = $this->ozonService->getOzonProducts();

        $stocks = Sandbox1c::getProductsStocks($products);

        return $stocks;
    }
}
