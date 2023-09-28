<?php

namespace App\Http\Controllers;


use App\Http\Requests\StoreAuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(StoreAuthRequest $request)
    {
    $imagePath = $request->photo; // Chemin vers votre image

    // Lire le contenu de l'image
    $imageData = File::get($imagePath);

    // Convertir l'image en base64
    $base64Image = base64_encode($imageData);

        $user = User::create([
            "username" => $request->username,
            "email" => $request->email,
            "name" => $request->name,
            "photo" => $base64Image,
            "password" => Hash::make($request->password),
            "succursales_id" => 2
        ]);
        return response($user, Response::HTTP_CREATED);
    }



    // public function login(Request $request)
    // {
    //     if (!Auth::attempt($request->only("username", "password"))) {
    //         return response([
    //             "message" => "Invalid credentials"
    //         ], Response::HTTP_UNAUTHORIZED);
    //     }
    //     $user = Auth::user();
    //     $token = $user->createToken("token")->plainTextToken;
    //     $cookie = cookie("token", $token, 24 * 60);

    //     return response([
    //         "token" => $token
    //     ])->withCookie($cookie);
    // }

    public function login(Request $request): Response
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response(['message' => $validator->errors()], 401);
        }

        $login = $request->only('username', 'password');

        if (Auth::attempt($login)) {
            $user = Auth::user();
            $success =  $user->createToken('MyApp')->plainTextToken;
            $cookie = cookie("token",$success,24 * 60);
            return response(['token' => $success,"user"=>$user], 200)->withCookie($cookie);
        }

        return response(['message' => 'Email or password is wrong'], 401);
    }




    public function user(Request $request)
    {
        return $request->user();
    }



    public function logout(): Response
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();
            Cookie::forget('token');

        return Response(['data' => 'User Logout successfully.'],200);
    }
}
