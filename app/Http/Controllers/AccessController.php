<?php

namespace App\Http\Controllers;

use App\Access;
use App\Http\Requests\AccessRequest;
use App\Http\Resources\AccessResource;

class AccessController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param AccessRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(AccessRequest $request)
    {
        $newAccess = Access::create($request->all());
        return response()->json(new AccessResource($newAccess), 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AccessRequest $request
     * @param Access $access
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(AccessRequest $request, Access $access)
    {
        $access->update($request->all());
        return response()->json(new AccessResource($access), 200);
    }
}
