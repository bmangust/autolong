<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    public const ACTION_CREATED = 'created';
    public const ACTION_UPDATED = 'updated';
    public const ACTION_DELETED = 'deleted';

    public static $write = true;

    protected $fillable = [
        'user_id',
        'action',
        'model',
        'model_name',
        'before',
        'after'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
