<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('importers', 'ImporterController@index');
Route::post('importers', 'ImporterController@store');
Route::get('importers/{importer}', 'ImporterController@show');
Route::put('importers/{importer}', 'ImporterController@update');
Route::post('importers/{importers}/savefile', 'ImporterController@importers');
Route::delete('importers/{importer}', 'ImporterController@destroy');

Route::get('containers', 'ContainerController@index');
Route::post('containers', 'ContainerController@store');
Route::get('containers/{container}', 'ContainerController@show');
Route::put('containers/{container}', 'ContainerController@update');
Route::post('containers/{container}/savefile', 'ContainerController@saveFile');
Route::delete('containers/{container}', 'ContainerController@destroy');

Route::get('providers', 'ProviderController@index');
Route::post('providers', 'ProviderController@store');
Route::get('providers/{provider}', 'ProviderController@show');
Route::put('providers/{provider}', 'ProviderController@update');
Route::post('providers/{providers}/savefile', 'ProviderController@saveFile');
Route::delete('providers/{provider}', 'ProviderController@destroy');

Route::get('products', 'ProductController@index');
Route::post('products', 'ProductController@store');
Route::post('products/checknumbercode', 'ProductController@checkNumberCode');
Route::get('products/{product}', 'ProductController@show');
Route::put('products/{product}', 'ProductController@update');
Route::post('products/{product}/updateimage', 'ProductController@updateImage');
Route::post('products/{product}/savefile', 'ProductController@saveFile');
Route::delete('products/{product}', 'ProductController@destroy');

Route::get('catalogs', 'CatalogController@index');
Route::post('catalogs', 'CatalogController@store');
Route::get('catalogs/{catalog}', 'CatalogController@show');
Route::put('catalogs/{catalog}', 'CatalogController@update');
Route::post('catalogs/{catalogs}/savefile', 'CatalogController@saveFile');
Route::delete('catalogs/{catalog}', 'CatalogController@destroy');

Route::get('countries', 'CountryController@index');
Route::post('countries', 'CountryController@store');
Route::get('countries/{country}', 'CountryController@show');
Route::put('countries/{country}', 'CountryController@update');
Route::delete('countries/{country}', 'CountryController@destroy');

Route::get('orders', 'OrderController@index');
Route::post('orders', 'OrderController@store');
Route::post('orders/checkproductnumberwithus', 'OrderController@checkProductNUmberWithUs');
Route::get('orders/{order}', 'OrderController@show');
Route::put('orders/{order}', 'OrderController@update');
Route::delete('orders/{order}', 'OrderController@destroy');
Route::post('orders/{order}/changestatus', 'OrderController@changeStatus');
Route::post('orders/{order}/savefile', 'OrderController@saveFile');
Route::post('orders/{order}/changestatuspayment', 'OrderController@changeStatusPayment');

Route::get('tags', 'TagController@index');

Route::put('/orderitems/{orderitem}', 'OrderItemController@update');

Route::get('logs', 'LogController@index');

Route::delete('documents/{document}', 'DocumentController@destroy');
