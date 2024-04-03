<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagesProducts extends Model
{
    use HasFactory;
    public $table = 'images_products';
    protected $fillable = [
        'images',
        'product_id',
    ];
    public function products(){
        return $this->belongsTo(Products::class,'product_id','id');
    }
}