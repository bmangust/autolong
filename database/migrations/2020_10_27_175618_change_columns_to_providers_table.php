<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnsToProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->string('beneficiary_name')->nullable()->change();
            $table->string('beneficiary_account_name')->nullable()->change();
            $table->string('beneficiary_bank_address')->nullable()->change();
            $table->string('beneficiary_address')->nullable()->change();
            $table->string('beneficiary_bank_name')->nullable()->change();
            $table->string('beneficiary_bank_code')->nullable()->change();
            $table->string('beneficiary_swift_address')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('providers', function (Blueprint $table) {
            //
        });
    }
}
