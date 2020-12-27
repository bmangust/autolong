<?php


namespace App\Connections;


use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Sandbox1c
{
    private const CONNECTION = 'mysql_1c_sandbox';
    private const PRODUCTS_TABLE = 'products';
    private const TO_ENCODING = 'utf8';
    private const FROM_ENCODING = 'cp1251';

    public static function getBiggestAutolongNumber()
    {
        try {
            return mb_convert_encoding(DB::connection(self::CONNECTION)->table(self::PRODUCTS_TABLE)->orderByDesc('id')->first()->id_1c,
                    self::TO_ENCODING, self::FROM_ENCODING) + 1;
        } catch (HttpException $exception) {
            throw new HttpException(500, 'Не удалось получить информацию из базы данных 1с_sandbox.');
        }
    }
}
