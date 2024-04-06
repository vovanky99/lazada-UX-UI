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
        'user_id',
        'street_address_id',
        'ward_id',
    ];
    public function messages(){
        return $this->hasMany(MessagesShop::class,'shop_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function product(){
        return $this->hasMany(Products::class,'shop_id','id');
    }
    public function streetAddress(){
        return $this->belongsTo(StreetAddress::class,'street_address_id','id');
    }
    public function ward(){
        return $this->belongsTo(Ward::class,'ward_id','id');
    }
    public function followShop(){
        return $this->hasMany(FollowShop::class,'shop_id');
    }
    
}