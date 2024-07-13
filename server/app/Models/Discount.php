<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    public $table = 'discount';
    protected $fillable = [
        'discount_unit',
        'coupon_code',
        'status',
        'minimun_order_value',
        'maximum_discount_amount',
        'start_valid',
        'valid_until'
    ];
    public function products(){
        return $this->hasMany(Products::class,'discount_id','id');
    }
}