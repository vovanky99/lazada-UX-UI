<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderShipping extends Model 
{
    public $table = 'warehouse';
    protected $fillable = [
        'content',
        'shipping_warehouse',
        'order_id',
        'shipping_method_id',
        'shipping_unit_id',
    ];
    public function order(){
        return $this->belongsTo(OrderCart::class,'order_id');
    }
    public function shipping_method(){
        return $this->belongsTo(ShippingMethod::class,'shipping_method_id');
    }
    public function shipping_unit(){
        return $this->belongsTo(ShippingUnit::class,'shipping_unit_id');
    }
}