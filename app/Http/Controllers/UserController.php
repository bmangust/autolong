<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserWithRelationshipsResource;
use App\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    protected function userCreateValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
            'min' => 'Поле :attribute должно содержать не менее :min символов'
        ];

        $names = [
            'name' => 'имя',
            'email' => 'e-mail',
            'password' => 'пароль',
            'roleId' => 'роль',
            'lastname' => 'фамилия'
        ];

        return Validator::make($data, [
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8', 'confirmed'],
            'roleId' => ['required', 'integer'],
            'lastname' => ['required', 'string'],
            'name' => ['required', 'string'],
        ], $messages, $names);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(UserWithRelationshipsResource::collection(User::all()->sortByDesc('created_at')), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request, User $user)
    {
        $this->userCreateValidator($request->all())->validate();
        $name = $request->input('name');
        $lastname = $request->input('lastname');
        $patronymic = $request->input('patronymic');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $password = Hash::make($request->input('password'));
        $role = $request->input('role_id');
        $newUser = $user->create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => $role,
            'lastname' => $lastname,
            'patronymic' => $patronymic,
            'phone' => $phone
        ]);
        return response()->json(new UserWithRelationshipsResource($newUser), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user)
    {
        return response()->json(new UserWithRelationshipsResource($user), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, User $user)
    {
        $this->userCreateValidator($request->all())->validate();
        $name = $request->input('name');
        $lastname = $request->input('lastname');
        $patronymic = $request->input('patronymic');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $password = Hash::make($request->input('password'));
        $role = $request->input('role_id');
        $user->update([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => $role,
            'lastname' => $lastname,
            'patronymic' => $patronymic,
            'phone' => $phone
        ]);
        return response()->json(new UserWithRelationshipsResource($user), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse|void
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }
}
