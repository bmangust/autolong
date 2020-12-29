<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChangeTriggerFromProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (env('DB_ADD_TRIGGER', false)) {
            $database = env('DB_DATABASE', 'laravel');
            DB::unprepared("
                DROP TRIGGER IF EXISTS $database.products_BEFORE_UPDATE;
            ");
            $userName = env('DB_USERNAME', 'root');
            $database = env('DB_DATABASE', 'laravel');
            $databaseToInsertNew = env('DB_TO_INSERT_NEW_PRODUCTS', '');
            $fullPathImage = asset('public');
            DB::unprepared("
              CREATE DEFINER=`$userName`@`localhost` TRIGGER `$database`.`products_BEFORE_UPDATE` BEFORE UPDATE ON `products` FOR EACH ROW
                  BEGIN
                    IF OLD.published = 0 AND NEW.published = 1 THEN
                        DECLARE full_path VARCHAR(255);
                        SET full_path = CONCAT('$fullPathImage', NEW.image);
                        INSERT INTO 1c_sandbox.$databaseToInsertNew (name_ru, name_en, about_ru, about_en, price_rub, price_usd, price_cny, weight_netto, weight_brutto, image, autolong_number, vendor_code)
                        VALUES (NEW.name_ru, NEW.name_en, NEW.about_ru, NEW.about_en, NEW.price_rub, NEW.price_usd, NEW.price_cny, NEW.weight_netto, NEW.weight_brutto, full_path, NEW.autolong_number, NEW.vendor_code);
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

    }
}
