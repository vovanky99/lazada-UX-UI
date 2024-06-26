<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopShippingMethod extends Model
{
    use HasFactory;
    protected $table = 'shop_shipping_method';
    protected $fillable = [
        'cod',
        'shop_id',
        'shipping_method_id',
    ];
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id');
    }
    public function shipping_method(){
        return $this->belongsTo(ShippingMethod::class,'shipping_method_id');
    }
}