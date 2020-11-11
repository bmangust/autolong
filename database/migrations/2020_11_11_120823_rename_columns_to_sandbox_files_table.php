<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColumnsToSandboxFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sandbox_files', function (Blueprint $table) {
            $table->renameColumn('documented_id', 'sandbox_filed_id');
            $table->renameColumn('documented_type', 'sandbox_filed_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sandbox_files', function (Blueprint $table) {
            $table->renameColumn('sandbox_filed_id', 'documented_id');
            $table->renameColumn('sandbox_filed_type', 'documented_type');
        });
    }
}
