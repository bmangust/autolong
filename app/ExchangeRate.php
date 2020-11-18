<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    public const CRBF_DAILY_RATE_JSON = 'https://www.cbr-xml-daily.ru/daily_json.js';
    public const PERCENTAGE_MODULBANK = 0.35;
    public const FILE_INFO_COURSE = 'courses/courses.json';

    protected $fillable = ['rub', 'usd'];

    public function lastCourse()
    {
        return $this->latest()->first();
    }
}
