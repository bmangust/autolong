<?php

namespace App\Observers;

use App\Container;
use App\Http\Resources\ContainerResource;
use App\Log;
use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Support\Facades\Auth;

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
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $log->create([
                'user_id' => Auth::user()->id,
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
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $before = $container->withoutRelations()->getOriginal();
            $after = $container->withoutRelations()->toArray();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new ContainerResource($container)),
                'model_name' => get_class($container),
                'before' => json_encode(array_diff_assoc($before, $after)),
                'after' => json_encode(array_diff_assoc($after, $before)),
            ]);
        }
    }

    public function deleting(Container $container)
    {
        $container->orders()->update(['container_id' => null]);
        foreach ($container->sandboxFiles as $sandboxFile) {
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
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $log->create([
                'user_id' => Auth::user()->id,
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
