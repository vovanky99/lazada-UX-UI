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
        'address',
        'user_id',
        'street_address_id',
        'ward_id',
    ];
    public function users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function products(){
        return $this->hasMany(Products::class,'shop_id','id');
    }
    public function StreetAddress(){
        return $this->belongsTo(StreetAddress::class,'street_address_id','id');
    }
    public function Ward(){
        return $this->belongsTo(Ward::class,'ward_id','id');
    }
}