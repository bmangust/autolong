<?php

namespace App\Observers;

use App\Http\Resources\OrderResource;
use App\Log;
use App\Order;
use App\Provider;
use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Support\Facades\Auth;

class OrderObserver
{
    use HasEvents;

    /**
     * Handle the order "created" event.
     *
     * @param \App\Order $order
     * @return void
     */
    public function created(Order $order)
    {
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new OrderResource($order)),
                'model_name' => get_class($order)
            ]);
        }
        Provider::setProvidersCache();
    }

    /**
     * Handle the order "updated" event.
     *
     * @param \App\Order $order
     * @return void
     */
    public function updated(Order $order)
    {
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $before = $order->withoutRelations()->getOriginal();
            $after = $order->withoutRelations()->toArray();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new OrderResource($order)),
                'model_name' => get_class($order),
                'before' => json_encode(array_diff_assoc($before, $after)),
                'after' => json_encode(array_diff_assoc($after, $before)),
            ]);
        }
    }

    public function deleting(Order $order)
    {
        foreach ($order->sandboxFiles as $sandboxFile) {
            $sandboxFile->deleteFile();
            $sandboxFile->delete();
        }
    }

    /**
     * Handle the order "deleted" event.
     *
     * @param \App\Order $order
     * @return void
     */
    public function deleted(Order $order)
    {
        $order->orderItems()->delete();
        $order->contract()->delete();
        $order->proforma()->delete();
        $order->invoice()->delete();
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new OrderResource($order)),
                'model_name' => get_class($order)
            ]);
        }
        $container = $order->container;
        if (!$container->orders()->count()) {
            $container->delete();
        }
    }

    /**
     * Handle the order "restored" event.
     *
     * @param \App\Order $order
     * @return void
     */
    public function restored(Order $order)
    {
        //
    }

    /**
     * Handle the order "force deleted" event.
     *
     * @param \App\Order $order
     * @return void
     */
    public function forceDeleted(Order $order)
    {
        //
    }
}
