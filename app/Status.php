<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Status extends Model
{
    const PATH_STATUSES_FILE = 'statuses/statuses.json';

    public static function includeStatusFile()
    {
        return json_decode(Storage::disk('resources')->get(self::PATH_STATUSES_FILE));
    }

    public static function getOrderStatuses()
    {
        $statuses = self::includeStatusFile();
        return $statuses->orderStatuses;
    }

    public static function getOrderPaymentStatuses()
    {
        $statuses = self::includeStatusFile();
        return $statuses->paymentStatuses;
    }
}
