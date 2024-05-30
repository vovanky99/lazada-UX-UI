<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowShop extends Model
{
    use HasFactory;
    protected $table = 'follow_shop';
    protected $fillable = [
        'user_id','shop_id'
    ];
    public function shops(){
        return $this->hasMany(Shop::class,'shop_id');
    }
    
    public function users(){
        return $this->hasMany(User::class,'user_id');
    }
}