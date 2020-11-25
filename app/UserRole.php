<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $fillable = [
        'name',
        'access_id'
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
        $access = Access::create($accesses);
        $this->access_id = $access->id;
        $this->save();
    }
}
