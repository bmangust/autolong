<?php

namespace App\Observers;

use App\Http\Resources\ProviderResource;
use App\Log;
use App\Provider;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class ProviderObserver
{
    use HasEvents;

    /**
     * Handle the provider "created" event.
     *
     * @param \App\Provider $provider
     * @return void
     */
    public function created(Provider $provider)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new ProviderResource($provider)),
                'model_name' => get_class($provider)
            ]);
        }
    }

    /**
     * Handle the provider "updated" event.
     *
     * @param \App\Provider $provider
     * @return void
     */
    public function updated(Provider $provider)
    {
        if (Log::$write) {
            $log = new Log();
            $before = $provider->getOriginal();
            $after = $provider->toArray();
            $log->create([
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new ProviderResource($provider)),
                'model_name' => get_class($provider),
                'before' => json_encode(array_diff_assoc($before, $after)),
                'after' => json_encode(array_diff_assoc($after, $before)),
            ]);
        }
    }

    public function deleting(Provider $provider)
    {
        foreach ($provider->sandboxFiles as $sandboxFile) {
            $sandboxFile->deleteFile();
            $sandboxFile->delete();
        }
    }

    /**
     * Handle the provider "deleted" event.
     *
     * @param \App\Provider $provider
     * @return void
     */
    public function deleted(Provider $provider)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new ProviderResource($provider)),
                'model_name' => get_class($provider)
            ]);
        }
    }

    /**
     * Handle the provider "restored" event.
     *
     * @param \App\Provider $provider
     * @return void
     */
    public function restored(Provider $provider)
    {
        //
    }

    /**
     * Handle the provider "force deleted" event.
     *
     * @param \App\Provider $provider
     * @return void
     */
    public function forceDeleted(Provider $provider)
    {
        //
    }
}
