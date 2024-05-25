<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory ,Notifiable,HasApiTokens;
    protected $table = 'admin';
    protected $fillable =[
        'name',
        'username',
        'password',
        'avatar',
        'status',
        'phone_number',
        'gender',
        'birthday',
        'citizen_identification_card',
        'permanent_residennce_registration',
        'temporary_registration',
        'role_id',
        'department_id',
    ];

    protected $hidden =[
        'password',
        'remember_token',
    ];
    protected $casts = [
        'password' => 'hashed',
    ];

    public function role(){
        return $this->belongsTo(Role::class,'role_id','id');
    }
    public function address_p(){
        return $this->belongsTo(Address::class,'permanent_residennce_registration','id');
    }
    public function address_t(){
        return $this->belongsTo(Address::class,'temporary_registration','id');
    }
}