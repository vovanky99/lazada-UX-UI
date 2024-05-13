<?php 

namespace App\Http\Controllers\Admin ;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminController extends Controller{
    public function store(Request $request){
        $name = $request->name;
        $address = $request->address;
        $phone = $request->phone;
        $avatar = $request->avatar;
        // $nameAvatar = $avatar->getClientOriginalName();
        // $publicPath = public_path('upload/Admin/Images/Admin');
        // $avatar->move($publicPath,$nameAvatar);
        try{
            $admin = Admin::findOrFail(Auth::user()->id);
            // if($address){

            // }
            $admin->update([
                'name'=>$name,
                'avatar'=>$avatar,
                // 'temporary_registration'=>$address,
                'phone_number'=>$phone
            ]);
            return response()->json(['message'=>'update success'
        ],200);
        }
        catch(Exception $e){
            return response()->json(['message'=>$e],200);
        }
        
    }
}