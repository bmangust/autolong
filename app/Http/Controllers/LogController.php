<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogWithRelationshipsResource;
use App\Log;

class LogController extends Controller
{
    public function index()
    {
        return response()->json(LogWithRelationshipsResource::collection(Log::all()->sortByDesc('created_at')), 200);
    }
}
