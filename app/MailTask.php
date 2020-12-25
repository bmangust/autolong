<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MailTask extends Model
{
    protected $fillable = [
            'email',
            'dispatch_time',
            'notify_weekend'
    ];
}
