<?php

namespace App\Http\Controllers\front_end\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    //
    public function redirectToProvider(){
        return Socialite::driver('facebook')->redirect();
    }
    public function handleProviderCallback()
    {
            // Sau khi xác thực Facebook chuyển hướng về đây cùng với một token
            // Các xử lý liên quan đến đăng nhập bằng mạng xã hội cũng đưa vào đây.    
    }
}