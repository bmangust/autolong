<?php

namespace App;

use App\Http\Resources\DumpResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Redis;

class Dump extends Model
{
    public const DUMPS_CACHE_KEY = 'dumps';
    public const DUMPS_CACHE_TTL = 1380 * 60;

    protected $fillable = [
        'path'
    ];

    protected static function booted()
    {
        self::created(static function (){
            Dump::setDumpCache();
        });
    }

    public static function getCachedDumpsOrSetDumpsToCache()
    {
        $cacheKey = self::DUMPS_CACHE_KEY;
        $cachedDumps = Redis::get($cacheKey);

        if ($cachedDumps) {
            $dumps = json_decode($cachedDumps);
        } else {
            $dumps = self::setDumpCache();
        }
        return $dumps;
    }

    public static function setDumpCache(string $cacheKey = self::DUMPS_CACHE_KEY)
    {
        $dumps = DumpResource::collection(self::all()->sortByDesc('created_at'));
        Redis::set($cacheKey, json_encode($dumps), 'EX', self::DUMPS_CACHE_TTL);
        return $dumps;
    }
}
