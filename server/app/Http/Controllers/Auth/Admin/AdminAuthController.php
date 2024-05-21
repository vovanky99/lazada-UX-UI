<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
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
    public function getAmin(Request $request){
        $admin = Admin::where('id',Auth::user()->id)->select('admin.*')->with('role','address_t.ward.districts.cities.countries','address_p')->first();
        return response()->json($admin);
    }
}
    