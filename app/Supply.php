<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Supply extends Model
{
    const PATH_SUPPLY_FILE = 'supply/supply.json';

    private static function includeSupplyFile()
    {
        return json_decode(Storage::disk('resources')->get(self::PATH_SUPPLY_FILE));
    }

    public static function fob()
    {
        $supply = self::includeSupplyFile();
        return $supply->fob;
    }
}
