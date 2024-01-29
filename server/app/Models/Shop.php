<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Shop extends Model
{
    use HasFactory,HasApiTokens;
    public $table = 'shop';
    protected $fillable = [
        'name',
        'logo',
        'img_cover',
        'descriptions',
        'address',
        'users_id',
    ];
    public function users(){
        return $this->belongsTo(User::class,'users_id','id');
    }
    public function products(){
        return $this->hasMany(Products::class,'shop_id','id');
    }
}