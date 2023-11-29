<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;
    public $table = 'reviews';
    protected $fillable = [
        'title',
        'content_reviews',
        'users_id',
        'product_id',
    ];
    public function users(){
        return $this->belongsTo(User::class,'users_id','id');
    }
    public function products(){
        return $this->belongsTo(Products::class,'product_id','id');
    }
}
