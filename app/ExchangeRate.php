<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    const PERCENTAGE_MODULBANK = 0.35;
    const FILE_INFO_COURSE = 'courses/courses.json';

    protected $fillable = ['rub', 'usd'];

    public function lastCourse()
    {
        return $this->latest()->first();
    }
}
