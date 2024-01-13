<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    public $table = 'products';
    protected $fillable = [
        'title',
        'image',
        'price',
        'discount',
        'quantities',
        'products_sold',
        'descriptions',
        'categories_id',
        'shop_id',
        'products_type_id',
        'products_type_id1',
        'products_type_id2',
    ];
    public function categories(){
        return $this->belongsTo(Categories::class,'categories_id','id');
    }
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id','id');
    }
    public function productsType(){
        return $this->belongsTo(ProductsType::class,'products_type_id','id');
    }
    public function productsType1(){
        return $this->belongsTo(ProductsType::class,'products_type_id1','id');
    }
    public function productsTyp2(){
        return $this->belongsTo(ProductsType::class,'products_type_id2','id');
    }
    // public function products_type_detail(){
    //     return $this->belongsToMany(ProductsTypeDetail::class,'products_type_id','id');
    // }
    public function reviews(){
        return $this->hasMany(Reviews::class,'products_id','id');
    }
}