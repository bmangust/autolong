<?php

namespace App\Providers;

use App\Catalog;
use App\Container;
use App\Importer;
use App\Log;
use App\Order;
use App\Policies\CatalogPolicy;
use App\Policies\ContainerPolicy;
use App\Policies\ImporterPolicy;
use App\Policies\LogPolicy;
use App\Policies\OrderPolicy;
use App\Policies\ProductPolicy;
use App\Policies\UserPolicy;
use App\Policies\UserRolePolicy;
use App\Product;
use App\User;
use App\UserRole;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Catalog::class => CatalogPolicy::class,
        Container::class => ContainerPolicy::class,
        Importer::class => ImporterPolicy::class,
        Log::class => LogPolicy::class,
        Order::class => OrderPolicy::class,
        Product::class => ProductPolicy::class,
        User::class => UserPolicy::class,
        UserRole::class => UserRolePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
