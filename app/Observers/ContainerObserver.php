<?php

namespace App\Observers;

use App\Container;
use App\Http\Resources\ContainerResource;
use App\Log;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class ContainerObserver
{
    use HasEvents;

    /**
     * Handle the container "created" event.
     *
     * @param \App\Container $container
     * @return void
     */
    public function created(Container $container)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new ContainerResource($container)),
                'model_name' => get_class($container)
            ]);
        }
    }

    /**
     * Handle the container "updated" event.
     *
     * @param \App\Container $container
     * @return void
     */
    public function updated(Container $container)
    {
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
    }

    public function deleting(Container $container)
    {
        foreach ($container->documents as $sandboxFile) {
            $sandboxFile->deleteFile();
            $sandboxFile->delete();
        }
    }

    /**
     * Handle the container "deleted" event.
     *
     * @param \App\Container $container
     * @return void
     */
    public function deleted(Container $container)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new ContainerResource($container)),
                'model_name' => get_class($container)
            ]);
        }
    }

    /**
     * Handle the container "restored" event.
     *
     * @param \App\Container $container
     * @return void
     */
    public function restored(Container $container)
    {
        //
    }

    /**
     * Handle the container "force deleted" event.
     *
     * @param \App\Container $container
     * @return void
     */
    public function forceDeleted(Container $container)
    {
        //
    }
}
