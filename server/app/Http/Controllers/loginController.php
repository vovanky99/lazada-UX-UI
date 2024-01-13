<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest as LGRequest;

class LoginController extends Controller
{
    public function Logout(){
        Auth::logout();
        return redirect('/login');
    }
    public function getLogin(LGRequest $request){
        $login = [
            'username'=>$request->username,
            'password'=>$request->password,
            'decentralization_id'=>1,
        ];
        
        if(Auth::attempt($login,$request->remember)){        
            return redirect('');
        }
        else{
            return redirect('/login')->with('error','user is not admin ');
        }
    }
}