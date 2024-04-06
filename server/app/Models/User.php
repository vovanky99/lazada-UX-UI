<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone_number',
        'status',
        'avatar',
        'level',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'phone_number',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function role(){
        return $this->belongsTo(Role::class,'role_id','id');
    }
    public function shop(){
        return $this->hasOne(Shop::class,'user_id','id');
    }
    public function reviews(){
        return $this->hasOne(Reviews::class,'user_id','id');
    }
    public function order(){
        return $this->hasMany(OrderCart::class,'user_id','id');
    }
    public function addressUsers(){
        return $this->hasMany(AddressUsers::class,'user_id','id');
    }
    public function provider(){
        return $this->hasMany(Provider::class,'user_id','id');
    }
    public function followShop(){
        return $this->hasMany(FollowShop::class,'user_id');
    }
    public function messages_sender(){
        return $this->belongsTo(Messages::class,'sender_id');
    }
    public function messages_receiver(){
        return $this->belongsTo(Messages::class,'receiver_id');
    }
}