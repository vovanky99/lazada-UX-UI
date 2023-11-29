<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
    public $table = 'voucher';
    protected $fillable = [
        'title',
        'descriptions',
        'percents',
        'quantity',
        'categories_id',
        'products_type_id',
        'start_day',
        'end_day',
    ];
    public function categories(){
        return $this->belongsTo(Categories::class,'categories_id','id');
    }
    public function productsType(){
        return $this->belongsTo(ProductsType::class,'products_type_id','id');
    }
}
