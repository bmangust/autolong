<?php


namespace App\Connections;

use App\Product;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Redis;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use PDO;

class Sandbox1c
{
    private const CONNECTION = 'mysql_1c_sandbox';
    private const PRODUCTS_TABLE = 'products';
    private const AUTOLONG_ERP_NEW_PRODUCTS_TABLE = 'autolong_erp_new_products';
    private const TO_ENCODING = 'utf8';
    private const FROM_ENCODING = 'cp1251';
    public const BALANCE_CACHE_KEY = 'balance';
    public const BALANCE_CACHE_TTL = 60 * 60;

    /**
     * Выполнить подключение к старой базе автолонга
     * @return PDO
     */
    private static function connect(): PDO
    {
        return new PDO('mysql:host=185.148.39.175;port=3306;charset=utf8mb4;dbname=1c_sandbox', 'hayk', '8Hzmn7ma12@');
    }

    /**
     * Выполнить подключение к старой базе автолонга
     * @return PDO
     */
    private static function connectLocal(): PDO
    {
        return new PDO('mysql:host=127.0.0.1;port=3306;charset=utf8mb4;dbname=autolong', 'root', 'Autolong!02-11-NEW$!');
    }

    public static function getProductsStocks(array $codes): array
    {
        $codesPreparation = join(",", array_pad(array(), count(
                array_keys($codes)
        ), "?"));


//        $data = self::connect()->prepare("
//            SELECT b.code, b.period, b.balance FROM balance b
//            INNER JOIN (SELECT code, max(STR_TO_DATE(period, '%d.%m.%Y %k:%i:%s')) as max_period FROM balance WHERE code IN ($codesPreparation) GROUP BY code) grd
//            ON b.code = grd.code AND STR_TO_DATE(b.period, '%d.%m.%Y %k:%i:%s') = grd.max_period
//            WHERE b.code IN ($codesPreparation)
//        ");

        $data = self::connect()->prepare("
            SELECT * from marketplaces
            WHERE code IN ($codesPreparation)
        ");

        $data->execute(array_keys($codes));

        $stocks = [];

        foreach ($data->fetchAll(PDO::FETCH_OBJ) as $item)
        {
            if($item->balance !== null && $item->balance >= 0) {
                $stocks[] = [
                        'offer_id' => (string) $item->code,
                        'product_id' => $codes[$item->code],
                        'stock' => $item->balance
                ];
            }
        }

        return $stocks;
    }

    public static function getBiggestAutolongNumber()
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $code = self::connect()->query("SELECT code FROM $productTable order by CAST(code as UNSIGNED) DESC LIMIT 1;")->fetchAll(PDO::FETCH_OBJ);
            $latestCodeInAutolongErp = self::connect()->query("SELECT autolong_number FROM $autolongTable order by CAST(autolong_number as UNSIGNED) DESC LIMIT 1;")->fetchAll(PDO::FETCH_OBJ);
            $newCodeLocal = Product::query()->orderByRaw('CAST(autolong_number as UNSIGNED) DESC')->first()->autolong_number + 1;
            if (!empty($code)) {
                $code = $code[0]->code + 1;
                if (!empty($latestCodeInAutolongErp)) {
                    $latestCodeInAutolongErp = $latestCodeInAutolongErp[0]->autolong_number;
                    if ($code <= $latestCodeInAutolongErp) {
                        $code = $latestCodeInAutolongErp + 1;
                    }
                }

                return $code > $newCodeLocal ? $code : $newCodeLocal;
            }
            return uniqid('', true);
        } catch (HttpException $exception) {
            throw new HttpException(500, 'Не удалось получить информацию из базы данных 1с_sandbox.');
        }
    }

    public static function getBalance()
    {
        try {

	        $cachedBalance = Redis::get(self::BALANCE_CACHE_KEY);

	        if ($cachedBalance) {
	            $result = json_decode($cachedBalance);
	        } else {
	            $data = self::connect()->query("SELECT * FROM `balance` WHERE supplier IS NOT NULL")->fetchAll(PDO::FETCH_OBJ);

	            $result = [];

	            foreach($data as $res) {
		        	$result[preg_replace('/\D/', '', $res->code)] = $res;
	            }

	            Redis::set(self::BALANCE_CACHE_KEY, json_encode($result), 'EX', self::BALANCE_CACHE_TTL);
	        }

            return $result;
        } catch (HttpException $exception) {
        }
    }

    public static function getProducts()
    {
        try {

            $data = self::connect()->query("SELECT * FROM `products`")->fetchAll(PDO::FETCH_OBJ);

            $result = [];

            foreach($data as $res) {
	        	$result[$res->code] = $res;
            }

            return $result;

        } catch (HttpException $exception) {
        }
    }

    public static function getProductsList()
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $data = self::connect()->query("SELECT id_1c as autolong_number,code as code_from_1c FROM products")->fetchAll(PDO::FETCH_OBJ);

            $result = [];

            foreach($data as $res) {
	        	$result[preg_replace('/\D/', '', $res->autolong_number)] = $res->code_from_1c;
            }

            $localData = DB::table('1c_sandbox.' . $autolongTable)->select(['code_from_1c', 'autolong_number'])->whereNotNull(['code_from_1c', 'autolong_number'])->pluck('code_from_1c', 'autolong_number')->toArray();

            foreach($localData as $key => $value) {
                $result[preg_replace('/\D/', '', $key)] = $value;
            }

            return $result;

        } catch (HttpException $exception) {
	        print_r($exception);
        }
    }

    public static function getProduct1cId($autolong_number)
    {
        $autolong_number = preg_replace('/\D/', '', $autolong_number);

        try {
            $data = self::connect()->prepare("SELECT id_1c as autolong_number,code as code_from_1c FROM products WHERE id_1c = ?");
            $data->execute([$autolong_number]);
            $result = $data->fetch();

            if (is_array($result) && isset($result['code_from_1c'])) return $result['code_from_1c'];
        } catch (HttpException $exception) {
            return null;
        }

        return null;
    }

    public static function getCode_1C($autolong_number)
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $code = self::connect()->query("SELECT code_from_1c FROM $autolongTable WHERE autolong_number = $autolong_number")->fetchAll(PDO::FETCH_OBJ);

            if($code && $code[0]) {
				return $code[0]->code_from_1c;
            } else {
                $code = DB::table('1c_sandbox.' . $autolongTable)
                                ->select(['code_from_1c', 'autolong_number'])
                                ->where('autolong_number', (string) $autolong_number)
                                ->first()->code_from_1c ?? null;

                if($code) return $code;
            }

        } catch (HttpException $exception) {
        }

        return null;
    }

    public static function getBalances($year = 0)
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $data = self::connect()->query("SELECT `code`,count(balance) as balancei FROM balance WHERE `period2` BETWEEN ".(time() - (90 + $year) * 86400)." AND ".(time() - $year * 86400)." GROUP BY `code`")->fetchAll(PDO::FETCH_OBJ);

            $result = [];

            foreach($data as $res) {
	        	$result[preg_replace('/\D/', '', $res->code)] = $res->balancei;
            }

            return $result;


        } catch (HttpException $exception) {
        }
    }

    public static function getSoldPieces($year = 0)
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $data = self::connect()->query("SELECT `code`,sum(Sold_pieces) as pieces FROM products_mark WHERE `date2` BETWEEN ".(time() - (90 + $year) * 86400)." AND ".(time() - $year * 86400)." GROUP BY `code` LIMIT 10")->fetchAll(PDO::FETCH_OBJ);

            $result = [];

            foreach($data as $res) {
	        	$result[preg_replace('/\D/', '', $res->code)] = $res->pieces;
            }

            return $result;


        } catch (HttpException $exception) {
        }
    }

/*
    public static function convertDateToUnixTime()
    {
        try {
            $productTable = self::PRODUCTS_TABLE;
            $autolongTable = self::AUTOLONG_ERP_NEW_PRODUCTS_TABLE;

            $data = self::connect()->query("SELECT * FROM balance WHERE `period2` IS NULL LIMIT 500000");

            $result = [];

            foreach($data as $res) {
	        	# echo $res->date." - ".strtotime($res->date)."'\n";
	        	self::connect()->query("UPDATE balance SET `period2`='".strtotime($res->period)."' WHERE `id`='".$res->id."'");
            }

            return $result;


        } catch (HttpException $exception) {
        }
    }
*/

}
