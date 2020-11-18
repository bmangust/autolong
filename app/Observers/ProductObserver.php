<?php

namespace App\Observers;

use App\Http\Resources\ProductResource;
use App\Log;
use App\Product;
use Illuminate\Database\Eloquent\Concerns\HasEvents;

class ProductObserver
{
    use HasEvents;

    /**
     * Handle the product "created" event.
     *
     * @param \App\Product $product
     * @return void
     */
    public function created(Product $product)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new ProductResource($product)),
                'model_name' => get_class($product)
            ]);
        }
    }

    /**
     * Handle the product "updated" event.
     *
     * @param \App\Product $product
     * @return void
     */
    public function updated(Product $product)
    {
        if (Log::$write) {
            $log = new Log();
            $before = $product->getOriginal();
            $after = $product->toArray();
            $log->create([
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new ProductResource($product)),
                'model_name' => get_class($product),
                'before' => json_encode(array_diff_assoc($before, $after)),
                'after' => json_encode(array_diff_assoc($after, $before)),
            ]);
        }
    }

    public function deleting(Product $product)
    {
        foreach ($product->sandboxFiles as $sandboxFile) {
            $sandboxFile->deleteFile();
            $sandboxFile->delete();
        }
    }

    /**
     * Handle the product "deleted" event.
     *
     * @param \App\Product $product
     * @return void
     */
    public function deleted(Product $product)
    {
        if (Log::$write) {
            $log = new Log();
            $log->create([
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new ProductResource($product)),
                'model_name' => get_class($product)
            ]);
        }
    }

    /**
     * Handle the product "restored" event.
     *
     * @param \App\Product $product
     * @return void
     */
    public function restored(Product $product)
    {
        //
    }

    /**
     * Handle the product "force deleted" event.
     *
     * @param \App\Product $product
     * @return void
     */
    public function forceDeleted(Product $product)
    {
        //
    }
}
