<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductsTypeDetail extends Model
{
    use HasFactory;
    public $table = 'products_type_detail';
    protected $fillable =[
        'title',
        'image',
        'products_type_id'
    ];

    public function ProductsType(){
        return $this->belongsTo(ProductsType::class,'products_type_id','1');
    }
}