<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsFromAccessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accesses', function (Blueprint $table) {
            $table->char('products_new_index',1)->default(0);
            $table->char('compare_index',1)->default(0);
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
            $table->dropColumn('products_new_index');
            $table->dropColumn('compare_index');
        });
    }
}
