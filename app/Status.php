<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Status extends Model
{
    const PATH_STATUSES_FILE = 'statuses/statuses.json';

    private static function includeStatusesFile()
    {
        return json_decode(Storage::disk('resources')->get(self::PATH_STATUSES_FILE));
    }

    public static function getOrderStatuses()
    {
        $statuses = self::includeStatusesFile();
        return $statuses->orderStatuses;
    }

    public static function getOrderPaymentStatuses()
    {
        $statuses = self::includeStatusesFile();
        return $statuses->paymentStatuses;
    }

    public static function getContainerStatuses()
    {
        $statuses = self::includeStatusesFile();
        return $statuses->containerStatuses;
    }
}
