<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{

    const PARENT_DIRECTORY = '/storage/sandbox';

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'document_order', 'document_id', 'order_id')
            ->withTimestamps();
    }

    public function products()
    {
        return $this->belongsToMany('App\Product', 'document_product', 'document_id', 'product_id')
            ->withTimestamps();
    }

    public function containers()
    {
        return $this->belongsToMany('App\Container', 'container_document', 'document_id', 'container_id')
            ->withTimestamps();
    }

    public function importers()
    {
        return $this->belongsToMany('App\Importer', 'document_importer', 'document_id', 'importer_id')
            ->withTimestamps();
    }

    public function catalogs()
    {
        return $this->belongsToMany('App\Catalog', 'catalog_document', 'document_id', 'catalog_id')
            ->withTimestamps();
    }

    public function providers()
    {
        return $this->belongsToMany('App\Provider', 'document_provider', 'document_id', 'provider_id')
            ->withTimestamps();
    }

    public function putFileInFolder($file, $path)
    {
        $name = uniqid() . '.' . $file->extension();
        $path = Storage::disk('main')->putFileAs(self::PARENT_DIRECTORY . $path, $file, $name);
        $this->file = $path;
        $this->name = $name;
        $this->save();
        return $this;
    }
}
