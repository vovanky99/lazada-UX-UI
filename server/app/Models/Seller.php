<?php

namespace App\Models;

use App\Notifications\EmailResetPassword;
use App\Notifications\SellerVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Seller extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable ;
    protected $table = 'seller';
    protected $fillable =[
        'name',
        'email',
        'password',
        'phone_number',
        'avatar',
        'birthday',
        'descriptions',
        'status',
        'is_owner',
        'address_id',
        'shop_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function address(){
        return $this->belongsTo(Address::class,'address_id','id');
    }
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id','id');
    }
    public function sendEmailVerificationNotification()
    {
        $this->notify(new SellerVerifyEmail);
    }
    public function sendEmailResetPassword($token,$email){
        $this->notify(new EmailResetPassword($token,$email));
    }
    public function identity_info(){
        return $this->hasMany(IdentityInfo::class,'identitiesable_id');
    }
}