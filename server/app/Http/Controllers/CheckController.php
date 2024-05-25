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
}