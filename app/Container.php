<?php

namespace App;

use App\Http\Resources\ContainerResource;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = [
        'name',
        'status',
        'city'
    ];

    public const SANDBOX_DIRECTORY = '/container/';

    protected static function booted()
    {
        static::created(function (Container $container) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => json_encode(new ContainerResource($container)),
                    'model_name' => get_class($container)
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
                    'model' => json_encode(new ContainerResource($container)),
                    'model_name' => get_class($container),
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
                    'model' => json_encode(new ContainerResource($container)),
                    'model_name' => get_class($container)
                ]);
            }
        });
    }

    public function documents()
    {
        return $this->belongsToMany('App\Document', 'container_document', 'container_id', 'document_id')
            ->withTimestamps();
    }
}
