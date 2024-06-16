<?php 

namespace App\Http\Controllers\Auth\Seller;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class EmailVerifyController extends Controller{
    public function sendVerificationEmail(Request $request){
        if($request->user('')->hasVerifiedEmail()){
            return response()->json(['success' => 'Email already verified.'], 200);
        }
        $request->user('')->sendEmailVerificationNotification();
        return response()->json(['link' => 'Verification link sent!'], 200);
    }
    public function verify(Request $request){
        $seller = Seller::find($request->route('id'));
       if(!$seller->hasVerifiedEmail()){
        $seller->markEmailAsVerified();
        event(new Verified($seller));
        }
        return redirect(env('FRONTEND_URL').'seller/home?verified=1');
    }
}