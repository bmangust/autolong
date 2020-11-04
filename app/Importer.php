<?php

namespace App;

use App\Http\Resources\ImporterResource;
use Illuminate\Database\Eloquent\Model;

class Importer extends Model
{
    use TranslateToSnakeCase;

    protected $fillable = [
      'name_ru',
      'name_en',
      'address',
      'phone'
    ];

    protected static function booted()
    {
        static::created(function (Importer $importer) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => json_encode(new ImporterResource($importer)),
                    'model_name' => get_class($importer)
                ]);
            }
        });

        static::updated(function (Importer $importer) {
            if (Log::$write) {
                $log = new Log();
                $before = $importer->getOriginal();
                $after = $importer->toArray();
                $log->create([
                    'action' => Log::ACTION_UPDATED,
                    'model' => json_encode(new ImporterResource($importer)),
                    'model_name' => get_class($importer),
                    'before' => json_encode(array_diff($before, $after)),
                    'after' => json_encode(array_diff($after, $before)),
                ]);
            }
        });

        static::deleted(function (Importer $importer){
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_DELETED,
                    'model' => json_encode(new ImporterResource($importer)),
                    'model_name' => get_class($importer)
                ]);
            }
        });
    }
};
