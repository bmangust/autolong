<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogWithRelationshipsResource;
use App\Log;

class LogController extends Controller
{
    public function index()
    {
        $logs = Log::with('user')->orderByDesc('created_at')->get();
        return response()->json(LogWithRelationshipsResource::collection($logs), 200);
    }
}
