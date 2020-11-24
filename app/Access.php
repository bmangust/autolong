<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Access extends Model
{
    protected $table = 'accesses';

    protected $fillable = [
        'orders_create',
        'orders_update',
        'orders_showCargo',
        'orders_delete',
        'orders_index',
        'containers_create',
        'containers_update',
        'containers_show',
        'containers_delete',
        'containers_index',
        'catalogs_create',
        'catalogs_update',
        'catalogs_show',
        'catalogs_delete',
        'catalogs_index',
        'products_create',
        'products_update',
        'products_show',
        'products_delete',
        'products_index',
        'providers_create',
        'providers_update',
        'providers_show',
        'providers_delete',
        'providers_index',
        'importers_create',
        'importers_update',
        'importers_show',
        'importers_delete',
        'importers_index',
        'user_roles_create',
        'user_roles_update',
        'user_roles_show',
        'user_roles_delete',
        'user_roles_index',
        'user_create',
        'user_update',
        'user_show',
        'user_delete',
        'user_index',
        'logs_index',
    ];
    public function userRole()
    {
        return $this->hasOne('App\UserRole');
    }
}
