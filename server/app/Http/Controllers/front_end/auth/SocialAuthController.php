<?php

namespace App\Http\Controllers\front_end\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Exception\ClientException;
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
    public function handleProviderCallback($provider){
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
            'email'=>$user->getEmail()
        ],[
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
        $token = $userCreated->createToken('token-name')->plainTextToken;
        return response()->json($userCreated,200,['Access-token'=>$token]);
    }

    public function validateProvider($provider){
        if(!in_array($provider,['facebook','google'])){
            return response()->json(['error'=>'Please login using facebook or google'],422);
        }
    }
    
}