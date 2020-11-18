<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Supply extends Model
{
    public const PATH_SUPPLY_FILE = 'supply/supply.json';

    private static function includeSupplyFile()
    {
        return json_decode(Storage::disk('resources')->get(self::PATH_SUPPLY_FILE));
    }

    public static function fob()
    {
        return self::includeSupplyFile()->fob;
    }
}
