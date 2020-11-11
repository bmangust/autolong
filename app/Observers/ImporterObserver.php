<?php

namespace App\Observers;

use App\Http\Resources\ImporterWithRelationshipsResource;
use App\Importer;
use App\Log;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class ImporterObserver
{
    use HasEvents;

    /**
     * Handle the importer "created" event.
     *
     * @param \App\Importer $importer
     * @return void
     */
    public function created(Importer $importer)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new ImporterWithRelationshipsResource($importer)),
                'model_name' => get_class($importer)
            ]);
        }
    }

    /**
     * Handle the importer "updated" event.
     *
     * @param \App\Importer $importer
     * @return void
     */
    public function updated(Importer $importer)
    {
        if (Log::$write) {
            $log = new Log();
            $before = $importer->getOriginal();
            $after = $importer->toArray();
            $log->create([
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new ImporterWithRelationshipsResource($importer)),
                'model_name' => get_class($importer),
                'before' => json_encode(array_diff($before, $after)),
                'after' => json_encode(array_diff($after, $before)),
            ]);
        }
    }

    public function deleting(Importer $importer)
    {
        foreach ($importer->sandboxFiles as $sandboxFile) {
            $sandboxFile->deleteFile();
            $sandboxFile->delete();
        }
    }

    /**
     * Handle the importer "deleted" event.
     *
     * @param \App\Importer $importer
     * @return void
     */
    public function deleted(Importer $importer)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new ImporterWithRelationshipsResource($importer)),
                'model_name' => get_class($importer)
            ]);
        }
    }

    /**
     * Handle the importer "restored" event.
     *
     * @param \App\Importer $importer
     * @return void
     */
    public function restored(Importer $importer)
    {
        //
    }

    /**
     * Handle the importer "force deleted" event.
     *
     * @param \App\Importer $importer
     * @return void
     */
    public function forceDeleted(Importer $importer)
    {
        //
    }
}
