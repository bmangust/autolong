<?php

namespace App\Http\Controllers;

use App\Dump;
use App\Http\Resources\DumpResource;

class DumpController extends Controller
{
    public function index()
    {
        return response()->json(Dump::getCachedDumpsOrSetDumpsToCache(), 200);
    }
}
