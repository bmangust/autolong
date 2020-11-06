<?php

namespace App\Observers;

use App\Http\Resources\OrderResource;
use App\Log;
use App\Order;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class OrderObserver
{
    use HasEvents;
    /**
     * Handle the order "created" event.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function created(Order $order)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new OrderResource($order)),
                'model_name' => get_class($order)
            ]);
        }
    }

    /**
     * Handle the order "updated" event.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function updated(Order $order)
    {
        if (Log::$write) {
            $log = new Log();
            $before = $order->getOriginal();
            $after = $order->toArray();
            $log->create([
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new OrderResource($order)),
                'model_name' => get_class($order),
                'before' => json_encode(array_diff($before, $after)),
                'after' => json_encode(array_diff($after, $before)),
            ]);
        }
    }

    public function deleting(Order $order)
    {
        foreach ($order->documents as $document) {
            $document->deleteFile();
            $document->delete();
        }
    }

    /**
     * Handle the order "deleted" event.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function deleted(Order $order)
    {
        $order->orderItems()->delete();
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new OrderResource($order)),
                'model_name' => get_class($order)
            ]);
        }
    }

    /**
     * Handle the order "restored" event.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function restored(Order $order)
    {
        //
    }

    /**
     * Handle the order "force deleted" event.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function forceDeleted(Order $order)
    {
        //
    }
}
