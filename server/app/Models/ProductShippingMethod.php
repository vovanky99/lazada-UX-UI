<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductShippingMethod extends Model
{
    use HasFactory;
    protected $table = 'product_shipping_method';
    protected $fillable = [
        'order_id',
        'shipping_method_id',
    ];
    public function order(){
        return $this->belongsTo(OrderCart::class,'order_id');
    }
    public function shipping_method(){
        return $this->belongsTo(ShippingMethod::class,'shipping_method_id');
    }
}