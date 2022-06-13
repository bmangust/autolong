<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Changelog extends Model
{
    protected $guarded = [];

    protected $casts = [
        'created_at' => 'timestamp'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
