<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductsType extends Model
{
    use HasFactory;
    public $table = 'products_type';
    protected $fillable = [
        'title',
        'descriptions',
    ];
    public function products(){
        return $this->hasMany(Products::class,'products_type_id','id');
    }
    public function voucher(){
        return $this->hasMany(Voucher::class,'products_type_id','id');
    }
}
