<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest as LGRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function Logout(){
        Auth::logout();
        return redirect()->route('login');
    }
    public function getLogin(LGRequest $request){
        $login = [
            'username'=>$request->username,
            'password'=>$request->password,
            'role_id'=>1,
        ];
        if(Auth::attempt($login,$request->remember)){        
            return redirect()->intended();
        }
        else{
            return redirect('/login')->with('error','user is not admin ');
        }

        // try{
        //     $login = [
        //         'username'=>$request->username,
        //         'password'=>$request->password,
        //         'role_id'=>1,
        //     ];
        //     if(Auth::attempt($login)){
        //         return response()->json([
        //             'status_code' => 500,
        //             'message' => 'Unauthorized'
        //         ]);
        //     }
        //     $user = User::where('username',$request->username)->first();
        //     if(!Hash::check($request->password,$user->password,[])){
        //         throw new \Exception('Error in Login');
        //     }
        //     $tokenResult =$user->createToken('authToken')->plainTextToken;
        //     return response()->json(['status_code'=>200,'access_token'=>$tokenResult,'token_type'=>'Bearer']);
        // }
        // catch(\Exception $error){
        //     return response()->json(['status_code'=>500,'message'=>'Error in Login','error' => $error,]);
        // }
    }
}