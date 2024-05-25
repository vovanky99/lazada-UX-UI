<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Shop extends Model
{
    use HasFactory;
    public $table = 'shop';
    protected $fillable = [
        'name',
        'logo',
        'img_cover',
        'descriptions',
        'address_id',
        'user_id',
    ];
    public function messages(){
        return $this->hasMany(MessagesShop::class,'shop_id');
    }
    public function shop_owner(){
        return $this->hasMany(ShopOwner::class,'shop_id');
    }
    public function product(){
        return $this->hasMany(Products::class,'shop_id');
    }
    public function followShop(){
        return $this->hasMany(FollowShop::class,'shop_id');
    }
    public function Address(){
        return $this->belongsTo(Address::class,'address_id');
    }
    
}