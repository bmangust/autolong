<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceRubColumnsToOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->double('payment_amount_rub')->default(0)->nullable()->after('payment_amount');
            $table->double('surcharge_amount_rub')->default(0)->nullable()->after('surcharge_amount');
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
            $table->dropColumn('payment_amount_rub');
            $table->dropColumn('surcharge_amount_rub');
        });
    }
}
