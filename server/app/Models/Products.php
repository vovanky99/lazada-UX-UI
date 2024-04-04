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
        'images',
        'price',
        'discount',
        'quantities',
        'descriptions',
        'category_id',
        'shop_id',
        'products_type_id',
        'products_type_id1',
        'products_type_id2',
    ];
    
    public function reviews(){
        return $this->hasMany(Reviews::class,'products_id','id');
    }
    public function images(){
        return $this->hasMany(ImagesProducts::class,'product_id','id');
    }
    public function orderProducts(){
        return $this->hasMany(OrderProducts::class,'product_id','id');
    }
    public function categories(){
        return $this->belongsTo(Categories::class,'category_id','id');
    }
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id','id');
    }
    public function discount(){
        return $this->hasMany(Discount::class,'product_id');
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
}