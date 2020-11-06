<?php

namespace App\Observers;

use App\Catalog;
use App\Http\Resources\CatalogResource;
use App\Log;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class CatalogObserver
{
    use HasEvents;
    /**
     * Handle the catalog "created" event.
     *
     * @param  \App\Catalog  $catalog
     * @return void
     */
    public function created(Catalog $catalog)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new CatalogResource($catalog)),
                'model_name' => get_class($catalog),
            ]);
        }
    }

    public function deleting(Catalog $catalog)
    {
        foreach ($catalog->documents as $document) {
            $document->deleteFile();
            $document->delete();
        }
    }

    /**
     * Handle the catalog "updated" event.
     *
     * @param  \App\Catalog  $catalog
     * @return void
     */
    public function updated(Catalog $catalog)
    {
        if (Log::$write) {
            $log = new Log();
            $before = $catalog->getOriginal();
            $after = $catalog->toArray();
            $log->create([
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new CatalogResource($catalog)),
                'model_name' => get_class($catalog),
                'before' => json_encode(array_diff($before, $after)),
                'after' => json_encode(array_diff($after, $before)),
            ]);
        }
    }

    /**
     * Handle the catalog "deleted" event.
     *
     * @param  \App\Catalog  $catalog
     * @return void
     */
    public function deleted(Catalog $catalog)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new CatalogResource($catalog)),
                'model_name' => get_class($catalog),
            ]);
        }
    }

    /**
     * Handle the catalog "restored" event.
     *
     * @param  \App\Catalog  $catalog
     * @return void
     */
    public function restored(Catalog $catalog)
    {
        //
    }

    /**
     * Handle the catalog "force deleted" event.
     *
     * @param  \App\Catalog  $catalog
     * @return void
     */
    public function forceDeleted(Catalog $catalog)
    {
        //
    }
}