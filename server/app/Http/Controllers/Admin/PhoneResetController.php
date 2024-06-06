<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Repositories\PasswordResetphoneRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Vonage\Client;
use Illuminate\Support\Str;
use Vonage\SMS\Message\SMS;

class PhoneResetController extends Controller{
    protected $vonageClient;
    protected $PasswordResetRepo;
    public function __construct(Client $vonageClient, PasswordResetphoneRepository $PasswordResetRepo)
    {
        $this->vonageClient = $vonageClient;
        $this->PasswordResetRepo = $PasswordResetRepo;
    }
    public function requestReset(Request $request){
        $request->validate(['phone_number'=>'required|exists:admin,phone_number']);
        $user = Admin::where('phone_number',$request->phone_number)->first();
        $token = $this->PasswordResetRepo->createToken($user->phone_number);
        $message = "Your password reset code is: $token";
        $this->vonageClient->sms()->send(new SMS($user->phone_number,env('NEXMO_FROM_NUMBER'),$message));
        return response()->json(['token'=>$token]);
    }
    public function resetPassword(Request $request){
        $request->validate([
            'phone_number' => 'required|exists:admin,phone_number',
            'token' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);
        $user = Admin::where('phone_number', $request->phone_number)->first();
        if($this->PasswordResetRepo->tokenExist($user->phone_number,$request->token)){
            $user->password = Hash::make($request->password);
            $user->setRememberToken(Str::random(60));
            $user->save();
            $this->PasswordResetRepo->deleteToken($user->phone_number);
            return response()->json(['success' => 'Password has been reset.']);
        }
        return response()->json(['message' => 'Invalid token.'], 400);
    }
}