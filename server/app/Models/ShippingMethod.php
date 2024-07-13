<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    use HasFactory;
    protected $table = 'shipping_method';
    protected $fillable = [
        'name',
        'price',
        'maximum_of_1_side',
        'weight_limit',
    ];
    public function product_shipping_methods(){
        return $this->hasMany(ProductShippingMethod::class,'shipping_method_id');
    }
    public function shop_shipping_methods(){
        return $this->hasMany(ShopShippingMethod::class,'shipping_method_id');
    }
    public function order_shipping(){
        return $this->hasMany(OrderShipping::class,'shipping_method_id');
    }
}