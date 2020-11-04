<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = [
        'name',
        'status',
        'city'
    ];

    protected static function booted()
    {
        static::created(function (Container $container) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => get_class($container),
                ]);
            }
        });

        static::updated(function (Container $container) {
            if (Log::$write) {
                $log = new Log();
                $before = $container->getOriginal();
                $after = $container->toArray();
                $log->create([
                    'action' => Log::ACTION_UPDATED,
                    'model' => get_class($container),
                    'before' => json_encode(array_diff($before, $after)),
                    'after' => json_encode(array_diff($after, $before)),
                ]);
            }
        });

        static::deleted(function (Container $container){
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_DELETED,
                    'model' => get_class($container),
                ]);
            }
        });
    }
}
