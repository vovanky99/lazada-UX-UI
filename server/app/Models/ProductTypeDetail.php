<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTypeDetail extends Model
{
    use HasFactory;
    public $table = 'product_type_detail';
    protected $fillable =[
        'title',
        'image',
        'product_type_id'
    ];

    public function ProductType(){
        return $this->belongsTo(ProductType::class,'product_type_id');
    }
}