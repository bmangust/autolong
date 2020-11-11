<?php

namespace App\Providers;

use App\Catalog;
use App\Container;
use App\Observers\SandboxFileObserver;
use App\SandboxFile;
use App\Importer;
use App\Observers\CatalogObserver;
use App\Observers\ContainerObserver;
use App\Observers\ImporterObserver;
use App\Observers\OrderObserver;
use App\Observers\ProductObserver;
use App\Observers\ProviderObserver;
use App\Order;
use App\Product;
use App\Provider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        SandboxFile::observe(SandboxFileObserver::class);
        Product::observe(ProductObserver::class);
        Importer::observe(ImporterObserver::class);
        Container::observe(ContainerObserver::class);
        Catalog::observe(CatalogObserver::class);
        Provider::observe(ProviderObserver::class);
        Order::observe(OrderObserver::class);
    }
}
