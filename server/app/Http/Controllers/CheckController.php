<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\ShopOwner;
use App\Models\User;

class CheckController extends Controller
{
    public function CheckUsername(){
        $type = Request()->get('type');
        $username = Request()->get('username');
        if($type == 'admin'){
            $admin = Admin::where('username',$username)->first();
            if($admin){
                return response()->json(['error'=>'Username already exists']);
            }
        }
        if($type == 'user'){
            $user = User::where('username',$username)->first();
            if($user){
                return response()->json(['error'=>'Username already exists']);
            }
        }
        if($type == 'shop_owner'){
            $shopOwner = ShopOwner::where('username',$username)->first();
            if($shopOwner){
                return response()->json(['error'=>'Username already exists']);
            }
        }
        return response()->json();
    }
    public function CheckEmail(){
        $type = Request()->get('type');
        $email = Request()->get('email');
        // if($type == 'admin'){
        //     $admin = Admin::where('email',$email)->first();
        //     if($admin){
        //         return response()->json(['error'=>'Username already exists']);
        //     }
        // }
        if($type == 'user'){
            $user = User::where('email',$email)->first();
            if($user){
                return response()->json(['error'=>'Email already exists']);
            }
        }
        if($type == 'shop_owner'){
            $shopOwner = ShopOwner::where('email',$email)->first();
            if($shopOwner){
                return response()->json(['error'=>'Username already exists']);
            }
        }
        return response()->json();
    }
    public function CheckPhone(){
        $type = Request()->get('type');
        $phone = Request()->get('phone');
        if($type == 'admin'){
            $admin = Admin::where('phone_number',$phone)->first();
            if($admin){
                return response()->json(['error'=>'phone already exists']);
            }
        }
        if($type == 'user'){
            $user = User::where('phone_number',$phone)->first();
            if($user){
                return response()->json(['error'=>'Phone already exists']);
            }
        }
        if($type == 'shop_owner'){
            $shopOwner = ShopOwner::where('phone_number',$phone)->first();
            if($shopOwner){
                return response()->json(['error'=>'Phone already exists']);
            }
        }
        return response()->json();
    }
}