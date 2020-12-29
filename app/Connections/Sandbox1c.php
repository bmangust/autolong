<?php


namespace App\Connections;

use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Sandbox1c
{
    private const CONNECTION = 'mysql_1c_sandbox';
    private const PRODUCTS_TABLE = 'products';
    private const AUTOLONG_ERP_NEW_PRODUCTS_TABLE = 'autolong_erp_new_products';
    private const TO_ENCODING = 'utf8';
    private const FROM_ENCODING = 'cp1251';

    public static function getBiggestAutolongNumber()
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $code = DB::connection(self::CONNECTION)
                    ->select("SELECT code FROM $productTable order by CAST(code as UNSIGNED) DESC LIMIT 1;");
            $latestCodeInAutolongErp = DB::connection(self::CONNECTION)
                    ->select("SELECT autolong_number FROM $autolongTable order by CAST(autolong_number as UNSIGNED) DESC LIMIT 1;");
            if (!empty($code)) {
                $code = $code[0]->code + 1;
                if (!empty($latestCodeInAutolongErp)) {
                    $latestCodeInAutolongErp = $latestCodeInAutolongErp[0]->autolong_number;
                    if ($code <= $latestCodeInAutolongErp) {
                        return $latestCodeInAutolongErp + 1;
                    }
                }
                return $code;
            }
            return uniqid('', true);
        } catch (HttpException $exception) {
            throw new HttpException(500, 'Не удалось получить информацию из базы данных 1с_sandbox.');
        }
    }
}
