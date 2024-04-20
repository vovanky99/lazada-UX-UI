<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{

    public function redirectToProvider($provider){
        $validated = $this->validateProvider($provider);
        if(!is_null($validated)){
            return $validated;
        }
        return Socialite::driver($provider)->stateless()->redirect();
    }
    public function handleProviderCallback($provider, Request $request){
        $validated = $this->validateProvider($provider);
        if(!is_null($validated)){
            return $validated;
        }
        // try{
            $user = Socialite::driver($provider)->stateless()->user();
        // }
        // catch(ClientException $exception){
        //     return response()->json(['error'=>'Invalid credentials provided.'],422);
        // }
        $userCreated = User::firstOrCreate([
            'email'=>$user->getEmail(),
        ],[
            'avatar'=>$user->getAvatar(),
            'email_verified_at'=>now(),
            'name'=>$user->getname(),
            'status'=>true,
        ]);
        $userCreated->providers()->updateOrCreate([
            'provider'=>$provider,
            'provider_id'=>$user->getId()
        ],[
            'avatar'=>$user->getAvatar()
        ]);
        $token = $userCreated->createToken('social-token')->plainTextToken ;
        $cookie = cookie('authToken',$token,time()+(10*365*24*60*60),httpOnly:false);
        return redirect('http://localhost:3000')->withCookie($cookie);
        // return response()->json($token)->withCookie($cookie);
    }
    public function decryptCookie(Request $request){
       
        $encryptedValue = $request->get('cookie');
        try {
            $decryptedValue = Crypt::decrypt($encryptedValue);
            return response()->json(['decryptedValue' => $decryptedValue],200);
        } catch (DecryptException $e) {
            return $e;
        }
        
    }
    public function validateProvider($provider){
        if(!in_array($provider,['facebook','google'])){
            return response()->json(['error'=>'Please login using facebook or google'],422);
        }
    }
}