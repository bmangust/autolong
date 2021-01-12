<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserWithRelationshipsResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|max:256',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw new HttpException( 400 , 'Учетные данные не соответствуют нашим.');
        }

        return $user->createToken($user->name)->plainTextToken;
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
    }

    public function user(Request $request)
    {
        return json_encode(new UserWithRelationshipsResource($request->user()));
    }
}
