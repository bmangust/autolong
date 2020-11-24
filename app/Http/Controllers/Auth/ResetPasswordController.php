<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
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
            'password' => 'required|string'
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
