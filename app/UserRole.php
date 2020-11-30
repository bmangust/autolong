<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use TranslateToSnakeCaseTrait;

    protected $fillable = [
        'name',
    ];

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function access()
    {
        return $this->hasOne('App\Access');
    }

    public function setAccesses(array $accesses): void
    {
        if (is_null($this->access)) {
            $access = Access::create($this->dashesToSnakeCase($accesses));
            $access->setUserRoleId($this->id);
            $this->save();
        } else {
            $this->access()->update($this->dashesToSnakeCase($accesses));
        }
    }
}
