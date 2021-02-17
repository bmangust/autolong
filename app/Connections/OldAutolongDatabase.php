<?php


namespace App\Connections;


use Illuminate\Database\ConnectionInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class OldAutolongDatabase
{
    public const AUTOLONG_LINK_IMAGE = 'https://autolong.ru/images/products/thumb/';
    /**
     * Информация по подключению
     */
    private const CONNECTION = 'mysql_old_autolong';
    private const PRODUCTS_TABLE = 'products';

    /**
     * Столбцы в старой бд
     */
    private const RAW_OLD_DB_NUMBER = 'number';
    private const RAW_OLD_DB_ARTICUL = 'articul';
    private const RAW_OLD_DB_NAME = 'name';
    private const RAW_OLD_DB_PRICE = 'price';
    private const RAW_OLD_DB_H_PRICE = 'h_price';
    private const RAW_OLD_DB_TEXT = 'text';
    private const RAW_OLD_DB_PHOTO = 'photo';

    /**
     * Выполнить подключение к старой базе автолонга
     * @return ConnectionInterface
     */
    private static function connect(): ConnectionInterface
    {
        return DB::connection(self::CONNECTION);
    }

    /**
     * @param string $number
     * @return Model|Builder|Collection|object
     */
    public static function findByNumber(string $number)
    {
        return self::connect()->table(self::PRODUCTS_TABLE)->selectRaw(
                self::RAW_OLD_DB_NUMBER . ' , ' .
                self::RAW_OLD_DB_ARTICUL . ' , ' .
                self::RAW_OLD_DB_NAME . ' , ' .
                self::RAW_OLD_DB_PRICE . ' , ' .
                self::RAW_OLD_DB_H_PRICE . ' , ' .
                self::RAW_OLD_DB_TEXT . ' , ' .
                "CONCAT('" . self::AUTOLONG_LINK_IMAGE . "'," . self::RAW_OLD_DB_PHOTO . ')' . ' as ' . self::RAW_OLD_DB_PHOTO
        )->where(self::RAW_OLD_DB_NUMBER, '=', $number)->first();
    }
}
