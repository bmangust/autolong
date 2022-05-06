<?php

namespace App\Http\Controllers;

use App\Product;
use App\Http\Resources\ProductWithRelationshipsResource;
use App\Http\Resources\LogWithRelationshipsResource;
use App\Connections\Sandbox1c;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\Model;

class PurchasesController extends Controller
{
    public function index()
    {
        // $products = Product::getCachedProductsOrSetProductsToCache(1);
        
        $data = [];
        
        $sold_pieces_current = Sandbox1c::getSoldPieces(1);
        $sold_pieces_last = Sandbox1c::getSoldPieces(365);
        
        $products = Sandbox1c::getBalance();
        $products_data = Sandbox1c::getProducts();
        
        $balance_current = Sandbox1c::getBalances(1);
        $balance_last = Sandbox1c::getBalances(365);
        
        foreach($products as $product) {
	        
	        $code = preg_replace("/\D/i","",$product->code);
	        $balance = preg_replace("/\D/i","",$product->balance);
	        
	        $vendor_code = "-";
	        $name = "-";
	        
	        if(!empty($products_data[$code])) {
	        	$vendor_code = $products_data[$code]->vendor_code;
	        	$name = $products_data[$code]->name;
	        }
	        
	        $currentSales = 0;
	        $lastSales = 0;
	        $inventoryDays = 0;
	        $balanceCurrent = 0;
	        $balanceLast = 0;

	        if(!empty($balance_current[$code])) {
	        	$balanceCurrent = $balance_current[$code];
	        }
	        
	        if(!empty($balance_last[$code])) {
		        $balanceLast = $balance_last[$code];        
	        }
	        
	        if(!empty($sold_pieces_current[$code])) {
	        	$currentSales = $sold_pieces_current[$code];
	        }
	        
	        if(!empty($sold_pieces_last[$code])) {
		        $lastSales = $sold_pieces_last[$code];
	        }
	        
	        if($balanceCurrent > 0 && $currentSales > 0) {
		        $currentSales = sprintf("%.4f", $currentSales / $balanceCurrent);
	        }
	        
	        if($balanceLast > 0 && $lastSales > 0) {
		        $lastSales = sprintf("%.4f", $lastSales / $balanceLast);
	        }
	        
	        $balance = ($balance);
	        
	        $inventoryDays = $currentSales > 0 && $balance > 0 ? sprintf("%.2f", $balance / $currentSales) : 0;
	        
	        if($code == 23998) {
	        #	echo $currentSales." - ".$balance." - currentSales: ".$sold_pieces_current[$code]." - balanceCurrent: ".$balance_current[$code]." - balanceLast: ".$balanceLast."\n";
	        }
	        	        
	        $data[] = array(
		        'autolongNumber' => $code,
		        'sku' => ($vendor_code),
		        'nameRu' => ($name),
		        'direction' => ($product->direction),
		        'providerName' => ($product->supplier),
		        'lastProviderName' => ($product->last_supplier),
		        'deliveryTime' => ($product->delivery_time),
		        'balance' => $balance,
		        'currentSales' => $currentSales,
		        'lastSales' => ($lastSales),
		        'inventoryDays' => $inventoryDays,
		        'orderByCurrent' => ($product->ordered)
	        );
        }
        
        return response()->json($data, 200);
    }
}
