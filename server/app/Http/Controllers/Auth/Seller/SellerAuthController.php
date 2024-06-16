<?php 

namespace App\Http\Controllers\Auth\Seller;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class SellerAuthController extends Controller{

    public function Login(Request $request){
        try{
            $credentials = $request->only('email','password');
            if(Auth::guard('seller')->attempt($credentials)){
                $s = Auth::guard('seller')->user();
                return response()->json(['token'=>$s->createToken('seller-token')->plainTextToken]);
            }
            else{
                return response()->json(['message'=>'Invalid credentials',401]);
            }
        }
        catch(Exception $e){
            return response()->json(['message'=>'register-fails',401]);
        }
    }
    public function register(Request $request){
        try{
            $s = Seller::where('email',$request->email)->orWhere('phone_number',$request->phone_numbers)->first();
            if($s){
                return response()->json(['error'=>'email or phone already!']);
            }
            $seller = Seller::create([
                'email'=>$request->email,
                'phone_number'=>$request->phone_number,
                'password'=>Hash::make($request->password),
            ]);
            event(new Registered($seller));
            $credentials = $request->only('email','password');
            if($seller && Auth::guard('seller')->attempt($credentials)){
                $s = Auth::guard('seller')->user();
                return response()->json(['token'=>$s->createToken('seller-token')->plainTextToken]);
            }
            else{
                return response()->json(['message'=>'Invalid credentials',401]);
            }
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    public function getSeller(){
        $seller = Auth::user();
        return response()->json($seller);
    }
}