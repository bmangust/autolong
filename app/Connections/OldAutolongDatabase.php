<?php


namespace App\Connections;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use PDO;

class OldAutolongDatabase
{
    public const AUTOLONG_LINK_IMAGE = "https://autolong.ru/images/products/thumb/";
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
     * @return PDO
     */
    private static function connect(): PDO
    {
        return new PDO(env('DB_OLD_DRIVER').':host='. env('DB_OLD_HOST') . ';port=' . env('DB_OLD_PORT') . ';charset=' . env('DB_OLD_CHARSET') . ';dbname=' . env('DB_OLD_DATABASE'), env('DB_OLD_USERNAME'), env('DB_OLD_PASSWORD'));
    }

    /**
     * @param string $number
     * @return mixed
     */
    public static function findByNumber(string $number)
    {
        $pdo = self::connect();
        return $pdo->query('SELECT ' .
                self::RAW_OLD_DB_NUMBER . ',' .
                self::RAW_OLD_DB_ARTICUL . ',' .
                self::RAW_OLD_DB_NAME . ',' .
                self::RAW_OLD_DB_PRICE . ',' .
                self::RAW_OLD_DB_H_PRICE . ',' .
                self::RAW_OLD_DB_TEXT . ',' .
                'CONCAT("' . self::AUTOLONG_LINK_IMAGE . '",' . self::RAW_OLD_DB_PHOTO . ')' . ' as ' . self::RAW_OLD_DB_PHOTO.
                ' FROM ' . self::PRODUCTS_TABLE .
                ' WHERE ' . self::RAW_OLD_DB_NUMBER . '=' . $number
        )->fetch(PDO::FETCH_OBJ);
    }
}
