<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    const ACTION_CREATED = 'created';
    const ACTION_UPDATED = 'updated';
    const ACTION_DELETED = 'deleted';

    public static $write = true;

    protected $fillable = [
        'user_id',
        'action',
        'model',
        'model_name',
        'before',
        'after'
    ];
}
