<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributesProduct extends Model
{
    protected $table = 'attributes_product';
    protected $fillable =[
        'value','product_id','attribute_detail_id'
    ];
    public function product(){
        return $this->belongsTo(Products::class,'product_id');
    }
    public function attribute_detail(){
        return $this->belongsTo(AttributesDetail::class,'attribute_detail_id');
    }
}