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
        'reviews_star',
        'descriptions',
        'categories_id',
        'shop_id',
        'products_type_id',
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
    public function reviews(){
        return $this->hasMany(Reviews::class,'product_id','id');
    }
}