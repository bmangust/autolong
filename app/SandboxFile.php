<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class SandboxFile extends Model
{
    public const PARENT_DIRECTORY = '/storage/sandbox';

    protected $fillable = [
        'file',
        'name',
        'description'
    ];

    public function sandboxFiled()
    {
        return $this->morphTo();
    }

    public function setFileAttribute($value)
    {
        if (strpos($value, '/') != 0) {
            return $this->attributes['file'] = '/' . $value;
        }
        return $this->attributes['file'] = $value;
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
        return $name . '.' . File::extension($this->file);
    }

    public function checkFileInFolder(string $path): bool
    {
        return Storage::disk('main')->exists($path);
    }

    public function getPathWithParentDirectory(string $path): string
    {
        return preg_replace('#^/#', '', self::PARENT_DIRECTORY . $path);
    }

    public function getClearName(string $name): string
    {
        $position = strpos($name, '.');
        if ($position) {
            return substr($name, 0, $position);
        }
        return $name;
    }
}
