<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;
    public $table = 'images';
    protected $fillable = [
        'images',
        'products_id',
        'reviews_id',
    ];
    public function products(){
        return $this->belongsTo(Products::class,'products_id','id');
    }
    public function reviews(){
        return $this->belongsTo(Reviews::class,'reviews_id','id');
    }
}