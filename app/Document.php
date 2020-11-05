<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{

    const PARENT_DIRECTORY = '/storage/sandbox';

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'document_order', 'document_id', 'order_id');
    }

    public function products()
    {
        return $this->belongsToMany('App\Product', 'document_product', 'document_id', 'product_id');
    }

    public function containers()
    {
        return $this->belongsToMany('App\Container', 'container_document', 'document_id', 'container_id');
    }

    public function importers()
    {
        return $this->belongsToMany('App\Importer', 'document_importer', 'document_id', 'importer_id');
    }

    public function catalogs()
    {
        return $this->belongsToMany('App\Catalog', 'catalog_document', 'document_id', 'catalog_id');
    }

    public function providers()
    {
        return $this->belongsToMany('App\Provider', 'document_provider', 'document_id', 'provider_id');
    }

    public function putFileInFolder($file, $path)
    {
        $path = Storage::disk('main')->putFileAs(self::PARENT_DIRECTORY . $path, $file, $this->id . '.' . $file->extension());
        $this->file = $path;
        $this->save();
        return $path;
    }
}
