<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name'];

    public function catalogs()
    {
        return $this->belongsToMany('App\Catalog', 'catalog_tag', 'tag_id', 'catalog_id');
    }
}
