<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Status extends Model
{
    public const PATH_STATUSES_FILE = 'statuses/statuses.json';

    private static function includeStatusesFile()
    {
        return json_decode(Storage::disk('resources')->get(self::PATH_STATUSES_FILE));
    }

    public static function getOrderStatuses()
    {
        return self::includeStatusesFile()->orderStatuses;
    }

    public static function getOrderPaymentStatuses()
    {
        return self::includeStatusesFile()->paymentStatuses;
    }

    public static function getOrderPaymentPrepaymentMade()
    {
        return array_search('Сделана предоплата', (array)self::getOrderPaymentStatuses(), true);
    }

    public static function getOrderPaymentPaidInFull()
    {
        return array_search('Оплачен полностью', (array)self::getOrderPaymentStatuses(), true);
    }

    public static function getOrderPaymentRefunded()
    {
        return array_search('Оплата возвращена"', (array)self::getOrderPaymentStatuses(), true);
    }

    public static function getContainerStatuses()
    {
        return self::includeStatusesFile()->containerStatuses;
    }
}
