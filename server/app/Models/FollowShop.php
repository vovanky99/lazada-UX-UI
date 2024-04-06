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
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id');
    }
    
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}