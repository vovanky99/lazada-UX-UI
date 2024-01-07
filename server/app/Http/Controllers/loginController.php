<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;

class loginController extends Controller
{
    
    public function Logout(){
        Auth::logout();
        return redirect('/login');
    }
    public function getLogin(LoginRequest $request){
        $login = [
            'username'=>$request->username,
            'password'=>$request->password
        ];
        
        if(Auth::attempt($login)){        
            return redirect('');
        }
        else{
            return redirect('/login');
        }
    }
}