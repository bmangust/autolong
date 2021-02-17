<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

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

Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/forgot', 'Auth\ResetPasswordController@forgot')->name('password.forgot');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', 'Auth\LoginController@user');
    Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

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
    Route::post('containers/{container}/changestatus', 'ContainerController@changeStatus');

    Route::get('providers', 'ProviderController@index');
    Route::post('providers', 'ProviderController@store');
    Route::get('providers/{provider}', 'ProviderController@show');
    Route::put('providers/{provider}', 'ProviderController@update');
    Route::delete('providers/{provider}', 'ProviderController@destroy');
    Route::put('providers/{provider}/setblacklabel', 'ProviderController@setBlackLabel');

    Route::get('products', 'ProductController@index');
    Route::get('products/unpublished', 'ProductController@indexUnpublished');
    Route::post('products', 'ProductController@store');
    Route::post('products/checknumbercodes', 'ProductController@checkNumberCode');
    Route::get('products/{product}', 'ProductController@show');
    Route::put('products/{product}', 'ProductController@update');
    Route::post('products/{product}/updateimage', 'ProductController@updateImage');
    Route::delete('products/{product}', 'ProductController@destroy');
    Route::put('products/{product}/publish', 'ProductController@publish');
    Route::post('products/getbyvendorcode', 'ProductController@indexVendorCode');

    Route::get('catalogs', 'CatalogController@index');
    Route::post('catalogs', 'CatalogController@store');
    Route::get('catalogs/{catalog}', 'CatalogController@show');
    Route::put('catalogs/{catalog}', 'CatalogController@update');
    Route::delete('catalogs/{catalog}', 'CatalogController@destroy');
    Route::post('catalogs/{catalog}/addfile', 'CatalogController@addFile');

    Route::get('countries', 'CountryController@index');
    Route::post('countries', 'CountryController@store');
    Route::get('countries/{country}', 'CountryController@show');
    Route::put('countries/{country}', 'CountryController@update');
    Route::delete('countries/{country}', 'CountryController@destroy');

    Route::get('orders', 'OrderController@index');
    Route::post('orders', 'OrderController@store');
    Route::get('orders/unapplied', 'OrderController@indexUnapplied');
    Route::post('orders/checkproductnumberwithus', 'OrderController@checkProductNumberWithUs');
    Route::get('orders/{order}', 'OrderController@show');
    Route::put('orders/{order}', 'OrderController@update');
    Route::delete('orders/{order}', 'OrderController@destroy');
    Route::put('orders/{order}/setpaymentstatuspaidinfull', 'OrderController@setPaymentStatusPaidInfull');
    Route::post('orders/{order}/changestatus', 'OrderController@changeStatus');
    Route::post('orders/{order}/changestatuspayment', 'OrderController@changeStatusPayment');
    Route::post('orders/{order}/addpayment', 'OrderController@addPayment');
    Route::post('orders/{order}/editpayment', 'OrderController@editPayment');
    Route::post('orders/{order}/deletepayment', 'OrderController@deletePayment');
    Route::get('orders/{order}/getpdfaccount', 'OrderController@getPdfAccount');
    Route::get('orders/{order}/getpdfinvoice', 'OrderController@getPdfInvoice');
    Route::get('orders/{order}/getpdfproforma', 'OrderController@getPdfProforma');
    Route::get('orders/{order}/getpdfcontract', 'OrderController@getPdfContract');
    Route::get('orders/{order}/getpdfmarkinglist', 'OrderController@getMarkingList');
    Route::post('orders/{order}/generatepdfproforma', 'OrderController@generatePdfProforma');
    Route::post('orders/{order}/generatepdfinvoice', 'OrderController@generatePdfInvoice');
    Route::post('orders/{order}/generatepdfcontract', 'OrderController@generatePdfContract');
    Route::post('orders/{order}/generatepdfpackinglist', 'OrderController@generatePdfPackingList');
    Route::post('orders/{order}/generatepdfaccount', 'OrderController@generatePdfAccount');
    Route::delete('orders/{order}/deletepdfcontractproviderstamp', 'OrderController@deletePdfContractProviderStamp');
    Route::delete('orders/{order}/deletepdfcontractimporterstamp', 'OrderController@deletePdfContractImporterStamp');
    Route::delete('orders/{order}/deletepdfcontractimportersignature', 'OrderController@deletePdfContractImporterSignature');
    Route::delete('orders/{order}/deletepdfcontractprovidersignature', 'OrderController@deletePdfContractProviderSignature');
    Route::delete('orders/{order}/deletepdfaccountimportersignature', 'OrderController@deletePdfAccountImporterSignature');
    Route::delete('orders/{order}/deletepdfaccountimporterstamp', 'OrderController@deletePdfAccountImporterStamp');
    Route::post('orders/{order}/checkbaikalstatus', 'OrderController@checkBaikalStatus');
    Route::delete('orders/{order}/deletebaikalstatus', 'OrderController@deleteBaikalStatus');
    Route::put('orders/{order}/setprices', 'OrderController@setPrices');

    Route::get('tags', 'TagController@index');

    Route::put('orderitems/{orderitem}', 'OrderItemController@update');

    Route::get('logs', 'LogController@index');

    Route::put('sandboxfiles/{sandboxFile}', 'SandboxFileController@update');
    Route::delete('sandboxfiles/{sandboxFile}', 'SandboxFileController@destroy');
    Route::post('{model}/{id}/savefile', 'SandboxFileController@saveFile')
        ->where('model', '(orders|providers|catalogs|containers|importers|products)'); //типы моделей во множественном числе. Не работает для слов оканчивающиеся на y или ies
    Route::bind('id', function ($id, $route) {
        $model = preg_replace('#s$#', '', $route->parameter('model'));
        $class = 'App\\' . ucfirst(Str::camel($model));
        $instance = $class::findOrFail($id);
        $route->forgetParameter('model');
        return $instance;
    });

    Route::get('cities', 'CityController@index');
    Route::post('cities', 'CityController@store');
    Route::delete('cities/{city}', 'CityController@destroy');

    Route::get('users', 'UserController@index');
    Route::post('users', 'UserController@store');
    Route::get('users/{user}', 'UserController@show');
    Route::put('users/{user}', 'UserController@update');
    Route::delete('users/{user}', 'UserController@destroy');

    Route::get('userroles', 'UserRoleController@index');
    Route::post('userroles', 'UserRoleController@store');
    Route::get('userroles/{userRole}', 'UserRoleController@show');
    Route::put('userroles/{userRole}', 'UserRoleController@update');
    Route::delete('userroles/{userRole}', 'UserRoleController@destroy');

    Route::get('mailtask', 'MailTaskController@index');
    Route::post('mailtask', 'MailTaskController@changeTime');
    Route::delete('mailtask', 'MailTaskController@destroy');

    Route::get('dumps', 'DumpController@index');
});
