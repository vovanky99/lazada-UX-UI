<?php

namespace App\Http\Controllers\Auth\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
       $request->validate([
        'email'=>'required|email',
        'password'=>'required'
       ]);
       $credentials = $request->only('email','password');
       if(Auth::guard('user')->attempt($credentials)){
        $user = Auth::guard('user')->user();
        return response()->json(['token'=>$user->createToken('user-token')->plainTextToken]);
       }
       else{
           return response()->json(['message'=>'Invalid credentials',401]);
       }
    }
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'     => 'required',
            'email'    => 'required',
            'password' => 'required'
        ]);
        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ]);
        }
        else{
            try{
                $user = User::create([
                    'name'     => $request->name,
                    'email'    => $request->email,
                    'password' => Hash::make($request->password),
                    'gender'=>$request->gender,
                    'birthday' =>$request->birthday,
                ]);
                $credentials = $request->only('email','password');
                if($user && Auth::guard('user')->attempt($credentials)){
                    $users = Auth::guard('user')->user();
                    return response()->json(['token'=>$users->createToken('api-token')->plainTextToken]);
                }
                else{
                    return response()->json(['message'=>'Invalid credentials',401]);
                }
            }
            catch(\Exception $e){
                return response()->json(['message'=>'register-fails',401]);
            }
            
        }
       
    }
    public function refresh(){
        return response()->json([
            'user'=>Auth::guard('user')->user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
            ]);
    }
    public function logout(Request $request)
    {
        // $user = Auth::user();
        // $user->tokens()->delete();
        if($request->hasCookie('authToken')){
            return response()->json(['message'=>'Logged out successfully'],200)->withCookie(Cookie::forget('authToken'));
        }
       else{ 
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
        }
    }
}
    