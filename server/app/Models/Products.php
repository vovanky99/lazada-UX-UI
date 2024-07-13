<?php

namespace App\Models;

use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Illuminate\Database\Eloquent\Model;

class Products extends Model implements Viewable
{
    use InteractsWithViews;
    public $table = 'products';
    protected $fillable = [
        'name',
        'images',
        'video',
        'status',
        'price',
        'discount',
        'quantity_in_stock',
        'descriptions',
        'discount_id',
        'category_id',
        'shop_id',
        'pre_order_goods',
        'number_of_days_to_pre_order',
        'conditions_of_goods',
        'sku',
    ];
    public function reviews(){
        return $this->hasMany(Reviews::class,'products_id','id');
    }
    public function images(){
        return $this->morphMany(Images::class,'imageable');
    }
    public function attributes_product(){
        return $this->hasMany(AttributesProduct::class,'product_id');
    }
    public function product_type(){
        return $this->hasMany(ProductType::class,'product_id','id');
    }
    public function order_products(){
        return $this->hasMany(OrderProduct::class,'product_id','id');
    }
    public function categories(){
        return $this->belongsTo(Categories::class,'category_id','id');
    }
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id','id');
    }
    public function discount(){
        return $this->belongsTo(Discount::class,'discount_id','id');
    }
}