<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderCart extends Model
{
    public $table = 'order_cart';
    protected $fillable = [
        'quantity',
        'status',
        'payment_id',
        'user_id',
    ];
    public function payment(){
        return $this->belongsTo(Payment::class,'payment_id','id');
    }
    public function users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function orders_product(){
        return $this->hasMany(OrderProduct::class,'order_id','id');
    }
    public function product_shipping_methods(){
        return $this->hasMany(ProductShippingMethod::class,'order_id');
    }
    public function order_shipping(){
        return $this->hasMany(OrderShipping::class,'order_id');
    }
}