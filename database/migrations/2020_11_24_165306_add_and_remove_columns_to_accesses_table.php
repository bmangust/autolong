<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAndRemoveColumnsToAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accesses', function (Blueprint $table) {
            $table->dropColumn('orders_show');
            $table->dropColumn('containers_show');
            $table->dropColumn('catalogs_show');
            $table->dropColumn('products_show');
            $table->dropColumn('providers_show');
            $table->dropColumn('importers_show');
            $table->dropColumn('user_roles_show');
            $table->dropColumn('user_show');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('accesses', function (Blueprint $table) {
            //
        });
    }
}
