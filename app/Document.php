<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    const PARENT_DIRECTORY = '/storage/sandbox';

    protected $fillable = [
      'file',
      'name',
      'description'
    ];

    public function documented()
    {
      return  $this->morphTo();
    }

    public function getUniqueFileName($file)
    {
        return  $name = uniqid() . '.' . $file->extension();
    }

    public function putFileInFolder($file, $path, $name)
    {
        return Storage::disk('main')->putFileAs(self::PARENT_DIRECTORY . $path, $file, $name);
    }

    public function deleteFile()
    {
        if (Storage::disk('main')->exists($this->file)) {
            Storage::disk('main')->delete($this->file);
        }
    }

    public function getNewFileName($name)
    {
        return $name . '.' . File::extension($this->file);;
    }
}
