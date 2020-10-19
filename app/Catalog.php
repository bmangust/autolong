<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Catalog extends Model
{
    use TranslateToSnakeCase;

    public const FILE_DIRECTORY = '/public/catalogs-files';

    protected $fillable = ['name', 'provider_id'];

    public function provider()
    {
        return $this->belongsTo('App\Provider');
    }

    public function tags()
    {
       return $this->belongsToMany('App\Tag', 'catalog_tag', 'catalog_id', 'tag_id');
    }

    public function createOrUpdateFile($file)
    {
        if (!is_null($this->file)) {
            $this->deleteFile();
        }
        $path = Storage::putFileAs(Catalog::FILE_DIRECTORY, $file, $this->id . '_' . $this->id . $file->extension());
        $this->file = $path;
        $this->save();
    }

    public function deleteFile()
    {
        if (!is_null($this->file) && Storage::exists($this->file)) {
            Storage::delete($this->file);
        }
        $this->file = null;
        $this->save();
    }

    public function checkAndAddTag($tags)
    {
        $newRequest = [];
        foreach ($tags as $tag) {
            $availableTag = Tag::firstOrCreate(['name' => mb_strtolower($tag)]);
            array_push($newRequest, $availableTag->id);
        }
        $this->tags()->sync($newRequest);
    }
}
