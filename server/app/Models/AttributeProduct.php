<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeProduct extends Model
{
    use HasFactory;
    public $table = 'attribute_product';
    protected $fillable =[
        'name','product_id','description'
    ];
    public function product(){
        return $this->belongsTo(Products::class,'product_id');
    }
}