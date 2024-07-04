<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;
    protected $table = 'shop';
    protected $fillable = [
        'name',
        'logo',
        'status',
        'img_cover',
        'descriptions',
        'address_id',
        'seller_id',
    ];
    public function messages(){
        return $this->hasMany(MessagesShop::class,'shop_id');
    }
    public function sellers(){
        return $this->hasMany(Seller::class,'shop_id');
    }
    public function products(){
        return $this->hasMany(Products::class,'shop_id');
    }
    public function follow_shops(){
        return $this->hasMany(FollowShop::class,'shop_id');
    }
    public function address(){
        return $this->belongsTo(Address::class,'address_id');
    }
    public function shop_shipping_methods(){
        return $this->hasMany(ShopShippingMethod::class,'shop_id');
    }
    public function tax_shop(){
        return $this->hasOne(TaxShop::class,'shop_id');
    }
}