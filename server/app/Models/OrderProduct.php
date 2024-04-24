<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;
    public $table = 'order_product';
    protected $fillable = [
        'order_id',        
        'quantity',        
        'product_id',    
    ];
    public function order(){
        return $this->belongsTo(OrderCart::class,'order_id','id');
    }
    public function products(){
        return $this->belongsTo(Products::class,'product_id','id');
    }
}