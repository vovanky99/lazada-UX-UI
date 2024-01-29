<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProducts extends Model
{
    use HasFactory;
    public $table = 'order_products';
    protected $fillable = [
        'order_id',        
        'quantity',        
        'production_id',    
    ];
    public function order(){
        return $this->belongsTo(Order::class,'order_id','id');
    }
    public function products(){
        return $this->belongsTo(Products::class,'production_id','id');
    }
}