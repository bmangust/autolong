<?php

namespace App;

use App\Http\Resources\CatalogResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Catalog extends Model
{
    use TranslateToSnakeCase;
    public const FILE_DIRECTORY = '/storage/catalogs-files';
    public const SANDBOX_DIRECTORY = '/catalogs/';

    protected $fillable = ['name', 'provider_id'];

    protected static function booted()
    {
        static::created(function (Catalog $catalog) {
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_CREATED,
                    'model' => json_encode(new CatalogResource($catalog)),
                    'model_name' => get_class($catalog),
                ]);
            }
        });

        static::updated(function (Catalog $catalog) {
            if (Log::$write) {
                $log = new Log();
                $before = $catalog->getOriginal();
                $after = $catalog->toArray();
                $log->create([
                    'action' => Log::ACTION_UPDATED,
                    'model' => json_encode(new CatalogResource($catalog)),
                    'model_name' => get_class($catalog),
                    'before' => json_encode(array_diff($before, $after)),
                    'after' => json_encode(array_diff($after, $before)),
                ]);
            }
        });

        static::deleted(function (Catalog $catalog){
            if (Log::$write) {
                $log = new Log();
                $log->create([
                    'action' => Log::ACTION_DELETED,
                    'model' => json_encode(new CatalogResource($catalog)),
                    'model_name' => get_class($catalog),
                ]);
            }
        });
    }

    public function provider()
    {
        return $this->belongsTo('App\Provider')->withTrashed();
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
        $path = Storage::disk('main')->putFileAs(Catalog::FILE_DIRECTORY, $file, $this->id . '_' . $this->id . '.' . $file->extension());
        $this->file = '/' . $path;
        $this->save();
    }

    public function deleteFile()
    {
        Storage::disk('main')->delete($this->file);
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

    public function documents()
    {
        return $this->belongsToMany('App\Document', 'catalog_document', 'catalog_id', 'document_id');
    }
}
