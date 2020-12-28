<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewPricesColumnsToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     * Все значения хранятся в юань.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->double('refusal_amount')->default(0)->nullable();
            $table->double('customs_amount')->default(0)->nullable();
            $table->double('ordering_amount')->default(0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('refusal_amount');
            $table->dropColumn('customs_amount');
            $table->dropColumn('ordering_amount');
        });
    }
}
