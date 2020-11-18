<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accesses', function (Blueprint $table) {
            $table->id();
            $table->char('orders_create', 1)->default(0);
            $table->char('orders_update', 1)->default(0);
            $table->char('orders_show_cargo', 1)->default(0);
            $table->char('orders_show', 1)->default(0);
            $table->char('orders_delete', 1)->default(0);
            $table->char('orders_index', 1)->default(0);
            $table->char('containers_create', 1)->default(0);
            $table->char('containers_update', 1)->default(0);
            $table->char('containers_show', 1)->default(0);
            $table->char('containers_delete', 1)->default(0);
            $table->char('containers_index', 1)->default(0);
            $table->char('catalogs_create', 1)->default(0);
            $table->char('catalogs_update', 1)->default(0);
            $table->char('catalogs_show', 1)->default(0);
            $table->char('catalogs_delete', 1)->default(0);
            $table->char('catalogs_index', 1)->default(0);
            $table->char('products_create', 1)->default(0);
            $table->char('products_update', 1)->default(0);
            $table->char('products_show', 1)->default(0);
            $table->char('products_delete', 1)->default(0);
            $table->char('products_index', 1)->default(0);
            $table->char('providers_create', 1)->default(0);
            $table->char('providers_update', 1)->default(0);
            $table->char('providers_show', 1)->default(0);
            $table->char('providers_delete', 1)->default(0);
            $table->char('providers_index', 1)->default(0);
            $table->char('importers_create', 1)->default(0);
            $table->char('importers_update', 1)->default(0);
            $table->char('importers_show', 1)->default(0);
            $table->char('importers_delete', 1)->default(0);
            $table->char('importers_index', 1)->default(0);
            $table->char('user_roles_create', 1)->default(0);
            $table->char('user_roles_update', 1)->default(0);
            $table->char('user_roles_show', 1)->default(0);
            $table->char('user_roles_delete', 1)->default(0);
            $table->char('user_roles_index', 1)->default(0);
            $table->char('user_create', 1)->default(0);
            $table->char('user_update', 1)->default(0);
            $table->char('user_show', 1)->default(0);
            $table->char('user_delete', 1)->default(0);
            $table->char('user_index', 1)->default(0);
            $table->char('logs_index', 1)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accesses');
    }
}
