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
        return $this->hasOne(Shop::class,'users_id','id');
    }
    public function reviews(){
        return $this->hasOne(Reviews::class,'users_id','id');
    }
    public function order(){
        return $this->hasMany(Order::class,'users_id','id');
    }
    public function provider(){
        return $this->hasMany(Provider::class,'user_id','id');
    }
}