<?php

namespace App\Observers;

use App\Http\Resources\ProductResource;
use App\Log;
use App\Product;
use Illuminate\Database\Eloquent\Concerns\HasEvents;
use Illuminate\Support\Facades\Auth;

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
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_CREATED,
                'model' => json_encode(new ProductResource($product)),
                'model_name' => get_class($product)
            ]);
        }
        $published = $product->published;
        $cacheKey = Product::getCacheKey($published);
        Product::setProductsCache($published, $cacheKey);
    }

    /**
     * Handle the product "updated" event.
     *
     * @param \App\Product $product
     * @return void
     */
    public function updated(Product $product)
    {
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $before = $product->withoutRelations()->getOriginal();
            $after = $product->withoutRelations()->toArray();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_UPDATED,
                'model' => json_encode(new ProductResource($product)),
                'model_name' => get_class($product),
                'before' => json_encode(array_diff_assoc($before, $after)),
                'after' => json_encode(array_diff_assoc($after, $before)),
            ]);
        }
        $published = $product->published;
        $cacheKey = Product::getCacheKey($published);
        Product::setProductsCache($published, $cacheKey);
        $oldPublished = $product->withoutRelations()->getOriginal()['published'];
        if ($oldPublished == 0) {
            $cacheKey = Product::getCacheKey($oldPublished);
            Product::setProductsCache($oldPublished, $cacheKey);
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
        if (Log::$write && Auth::user()) {
            $log = new Log();
            $log->create([
                'user_id' => Auth::user()->id,
                'action' => Log::ACTION_DELETED,
                'model' => json_encode(new ProductResource($product)),
                'model_name' => get_class($product)
            ]);
        }
        $published = $product->published;
        $cacheKey = Product::getCacheKey($published);
        Product::setProductsCache($published, $cacheKey);
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
