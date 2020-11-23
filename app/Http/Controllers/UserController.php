<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
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
            'roleId' => 'роль'
        ];

        return Validator::make($data, [
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8', 'confirmed'],
        ], $messages, $names);
    }

    protected function userLoginValidator(array $data)
    {
        $messages = [
            'required' => 'Поле :attribute обязательно для заполнения.',
            'max' => 'Поле :attribute должно содержать не более :max символов',
            'min' => 'Поле :attribute должно содержать не менее :min символов'
        ];

        $names = [
            'email' => 'e-mail',
            'password' => 'пароль',
        ];

        return Validator::make($data, [
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8', 'confirmed'],
        ], $messages, $names);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(UserResource::collection(User::all()->sortByDesc('created_at')), 200);
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
        $email = $request->input('email');
        $password = Hash::make($request->input('password'));
        $role = $request->input('role_id');
        $newUser = $user->create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => $role,
        ]);
        return response()->json(new UserResource($newUser), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user)
    {
        return response()->json(new UserResource($user), 200);
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
        $email = $request->input('email');
        $password = Hash::make($request->input('password'));
        $role = $request->input('role_id');
        $user->update([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => $role,
        ]);
        return response()->json(new UserResource($user), 200);
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

    public function login(Request $request)
    {
        $this->userLoginValidator($request->all())->validate();
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::whereEmail($email)->first();
        if ($user && Hash::check($password, $user->password)) {
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'user' => new UserResource($user),
                'token' => $token
            ], 200);
        }
        throw ValidationException::withMessages('Эти учетные данные не соответствуют нашим записям.');
    }

    public function logout(User $user)
    {
        $user->tokens()->delete();
        return response([], 200);
    }

    public function forgot(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        Password::sendResetLink($request->only('email'));
        return response()->json('Мы направили на ваш email ссылку на восстановление пароля', 200);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed'
        ]);

        $reset_password_status = Password::reset($request->all(), function ($user, $password) {
            $user->password = $password;
            $user->save();
        });

        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json("Предоставлен недействительный токен", 400);
        }

        return response()->json("Пароль был успешно изменен", 200);
    }
}
