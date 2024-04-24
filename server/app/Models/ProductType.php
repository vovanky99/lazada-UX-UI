<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    use HasFactory;
    public $table = 'product_type';
    protected $fillable = [
        'title',
        'status',
        'product_id',
        'descriptions',
    ];
    public function products(){
        return $this->belongsTo(Products::class,'product_id');
    }
    public function ProductTypeDetail(){
        return $this->hasMany(ProductTypeDetail::class,'product_type_id','id');
    }
}