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
        'phone_number',
        'birthday',
        'gender',
        'status',
        'address_id',
        'avatar',
        'level',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
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
    public function reviews(){
        return $this->hasMany(Reviews::class,'user_id','id');
    }
    public function order(){
        return $this->hasMany(OrderCart::class,'user_id','id');
    }
    public function address_Users(){
        return $this->hasMany(Address::class,'addressable_id');
    }
    public function providers(){
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
    public function reports_product(){
        return $this->hasMany(ReportsProduct::class,'user_id');
    }
    public function address(){
        return $this->belongsTo(Address::class,'address_id');
    }
}