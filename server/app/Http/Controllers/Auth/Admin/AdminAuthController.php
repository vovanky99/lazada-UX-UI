<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
    //    $request->validate([
    //     'username'=>'required',
    //     'password'=>'required'
    //    ]);
       $credentials = $request->only('username','password');
       if(Auth::guard('admin')->attempt($credentials)){
        $admin = Auth::guard('admin')->user();
        return response()->json(['token'=>$admin->createToken('admin-token')->plainTextToken]);
       }
       else{
           return response()->json(['message'=>'Invalid credentials',401]);
       }
    }
}
    