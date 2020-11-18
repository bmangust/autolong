<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagResource;
use App\Tag;

class TagController extends Controller
{
    public function index()
    {
        return response()->json(TagResource::collection(Tag::all()->sortByDesc('created_at')), 200);
    }
}
