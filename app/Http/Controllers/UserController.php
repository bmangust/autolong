<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        return response()->json(new UserResource($newUser), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function login(Request $request, User $user)
    {
        $this->userLoginValidator($request->all())->validate();
        $email = $request->input('email');
        $password = $request->input('password');

        if (Auth::attempt($email, $password)) {
            return response()->json(new UserResource(Auth::user()), 200);
        }
        throw ValidationException::withMessage('Данные введены некорректно');
    }
}
