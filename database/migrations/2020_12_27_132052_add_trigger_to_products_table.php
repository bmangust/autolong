<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddTriggerToProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (env('DB_ADD_TRIGGER', false)) {
            $userName = env('DB_USERNAME', 'root');
            $database = env('DB_DATABASE', 'laravel');
            $databaseToInsertNew = env('DB_TO_INSERT_NEW_PRODUCTS', '');
            DB::unprepared("
              CREATE DEFINER=`$userName`@`localhost` TRIGGER `$database`.`products_AFTER_INSERT` AFTER INSERT ON `products` FOR EACH ROW
                  BEGIN
                        IF NEW.published = 0 THEN
                            INSERT INTO 1c_sandbox.$databaseToInsertNew (name_ru, name_en, about_ru, about_en, price_rub, price_usd, price_cny, weight_netto, weight_brutto)
                            VALUES (NEW.name_ru, NEW.name_en, NEW.about_ru, NEW.about_en, NEW.price_rub, NEW.price_usd, NEW.price_cny, NEW.weight_netto, NEW.weight_brutto);
                        END IF;
                  END
        ");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (env('DB_ADD_TRIGGER', false)) {
            $database = env('DB_DATABASE', 'laravel');
            DB::unprepared("
                DROP TRIGGER IF EXISTS $database.products_AFTER_INSERT
            ");
        }
    }
}
