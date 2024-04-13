<?php

namespace App\Http\Controllers\front_end\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
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
       if(Auth::attempt($credentials)){
        $user = Auth::user();
        return response()->json(['user'=>$user,'authorization'=>[
            'token'=>$user->createToken('api-token')->plainTextToken,
            'type'=>'bearer',
        ]]);
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
                if($user && Auth::attempt($credentials)){
                    $users = Auth::user();
                    return response()->json(['user'=>$users,'authorization'=>[
                        'token'=>$users->createToken('api-token')->plainTextToken,
                        'type'=>'bearer',
                    ]]);
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
            'user'=>Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
            ]);
    }
    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
    