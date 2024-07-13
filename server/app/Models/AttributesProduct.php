<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributesProduct extends Model
{
    public $table = 'attributes_product';
    protected $fillable =[
        'value','product_id','attributes_detail_id'
    ];
    public function product(){
        return $this->belongsTo(Products::class,'product_id');
    }
    public function attribute_detail(){
        return $this->belongsTo(AttributesDetail::class,'attributes_detail_id');
    }
}