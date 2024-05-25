<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopOwner extends Model
{
    use HasFactory;
    protected $table = 'shop_owner';
    protected $filable =[
        'name',
        'email',
        'username',
        'password',
        'phone_number',
        'avatar',
        'birthday',
        'description',
        'is_owner',
        'address_id',
    ];

    protected $hidden =[
        'password',
    ];
}