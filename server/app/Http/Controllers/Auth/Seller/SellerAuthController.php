<?php 

namespace App\Http\Controllers\Auth\Seller;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class SellerAuthController extends Controller{

    public function Login(Request $request){
        try{
            $credentials = $request->only('email','password');
            if(Auth::guard('seller')->attempt($credentials)){
                $s = Auth::guard('seller')->user();
                return response()->json(['token'=>$s->createToken('seller-token')->plainTextToken]);
            }
            else{
                return response()->json(['error'=>"password or email don't correct!"]);
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
        $seller = Seller::where('id',Auth::user()->id)->select('seller.*')->with(['shop.shop_shipping_methods.shipping_method','address.ward.district.city.country','shop.address.ward.district.city.country','identity_info'])->first();
        return response()->json($seller);
    }
    public function sendResetLinkEmail(Request $request){
        $request->validate(['email'=>'required|email']);
        try{
            $seller = Seller::where('email',$request->email)->first();
            $status = Password::broker('seller')->createToken($seller);
            if(!$seller){
                return response()->json(['email'=>'email not found!']);
            }
            if($status){
                $seller->sendEmailResetPassword($status,$seller->email);
                return response()->json(['status' => 'Reset link sent to your email.'], 200);
            }
            return response()->json(['email' => 'Failed to send reset link'], 500);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    public function reset(Request $request){
        $request->validate([
            'token'=>'required',
            'email'=>'required|email',
            'password'=>'required|string|confirmed|min:8',
        ]);
        $status  = Password::broker('seller')->reset(
            $request->only('email','password','password_confirmation','token'),function(Seller $seller, string $password){
                $seller->forceFill([
                    'password'=>Hash::make($password),
                    'remember_token'=>Str::random(60),
                ])->save();
            }
        );
        return $status == Password::PASSWORD_RESET
                    ? response()->json(['status' => __($status)], 200)
                    : response()->json(['email' => [__($status)]], 400);
    }
}