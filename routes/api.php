<?php

use Illuminate\Http\Request;
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
Route::delete('importers/{importer}', 'ImporterController@destroy');

Route::get('containers', 'ContainerController@index');
Route::post('containers', 'ContainerController@store');
Route::get('containers/{container}', 'ContainerController@show');
Route::put('containers/{container}', 'ContainerController@update');
Route::delete('containers/{container}', 'ContainerController@destroy');

Route::get('providers', 'ProviderController@index');
Route::post('providers', 'ProviderController@store');
Route::get('providers/{provider}', 'ProviderController@show');
Route::put('providers/{provider}', 'ProviderController@update');
Route::delete('providers/{provider}', 'ProviderController@destroy');

Route::get('products', 'ProductController@index');
Route::post('products', 'ProductController@store');
Route::get('products/{product}', 'ProductController@show');
Route::put('products/{product}', 'ProductController@update');
Route::delete('products/{product}', 'ProductController@destroy');

Route::get('catalogs', 'CatalogController@index');
Route::post('catalogs', 'ProductController@store');
Route::get('catalogs/{catalog}', 'ProductController@show');
Route::put('catalogs/{catalog}', 'ProductController@update');
Route::delete('catalogs/{catalog}', 'ProductController@destroy');

Route::get('countries', 'CountryController@index');
Route::post('countries', 'CountryController@store');
Route::get('countries/{country}', 'CountryController@show');
Route::put('countries/{country}', 'CountryController@update');
Route::delete('countries/{country}', 'CountryController@destroy');
