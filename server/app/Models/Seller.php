<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Stmt\Return_;

class Seller extends Model
{
    use HasFactory;
    protected $table = 'seller';
    protected $filable =[
        'name',
        'email',
        'username',
        'password',
        'phone_number',
        'avatar',
        'birthday',
        'descriptions',
        'status',
        'is_owner',
        'address_id',
        'shop_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function address(){
        return $this->belongsTo(Address::class,'address_id','id');
    }
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id','id');
    }
}