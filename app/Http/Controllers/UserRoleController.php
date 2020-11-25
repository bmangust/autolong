<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserRoleResource;
use App\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller
{
    protected function userRoleCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
        ];

        $names = [
            'name' => 'название',
            'accesses' => 'доступы'
        ];

        return Validator::make($data, [
            'name' => ['required', 'string'],
            'accesses' => ['required']
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(UserRoleResource::collection(UserRole::all()), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->userRoleCreateValidator($request->all())->validate();
        $newRole = UserRole::create($request->all());
        $newRole->setAccesses($request->input('accesses'));
        return response()->json(new UserRoleResource($newRole), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param UserRole $role
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(UserRole $userRole)
    {
        return response()->json(new UserRoleResource($userRole), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param UserRole $role
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, UserRole $userRole)
    {
        $this->userRoleCreateValidator($request->all())->validate();
        $userRole->update($request->all());
        $userRole->setAccesses($request->input('accesses'));
        return response()->json(new UserRoleResource($userRole), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(UserRole $userRole)
    {
        $userRole->delete();
        return response()->json([], 204);
    }
}
