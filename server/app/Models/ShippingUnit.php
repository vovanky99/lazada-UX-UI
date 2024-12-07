<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingUnit extends Model 
{
    public $table = 'shipping_unit';
    protected $fillable = [
        'name',
        'website',
        'hotline',
        'descriptions',
    ];
    public function address(){
        return $this->morphMany(Address::class,'imageable');
    }
    public function order_shipping(){
        return $this->hasMany(OrderShipping::class,'shipping_unit_id');
    }
    public function sp_unit_size(){
        return $this->hasMany(ShippingUnitSizeLimit::class,'sp_unit_size_limit_id','id');
    }
    public function sp_unit_weight(){
        return $this->hasMany(ShippingUnitWeightLimit::class,'sp_unit_weight_limit_id','id');
    }
}