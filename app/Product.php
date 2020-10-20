<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use TranslateToSnakeCase;

    public const IMAGE_DIRECTORY = '/product-images';

    public function catalog()
    {
        return $this->belongsTo('App\Catalog');
    }

    public function orderItems()
    {
       return $this->hasMany('App\OrderItem');
    }

    public function createOrUpdateImage($image)
    {
        if (!is_null($this->image)) {
            $this->deleteImage();
        }
        $path = Storage::disk('main')->putFileAs(Product::IMAGE_DIRECTORY, $image, $this->id . '_' . $this->id . '.' . $image->getClientOriginalExtension());
        $this->image = $path;
        $this->save();
    }

    public function deleteImage()
    {
        if (!is_null($this->image) && Storage::exists($this->image)) {
            Storage::delete($this->image);
        }
        $this->image = null;
        $this->save();
    }
}
