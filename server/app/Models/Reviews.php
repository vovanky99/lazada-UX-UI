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
        'status',
        'review_star',
        'content_review',
        'parent_id',
        'user_id',
        'product_id',
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function parent(){
        return $this->belongsTo(Reviews::class,'parent_id','id');
    }
    public function product(){
        return $this->belongsTo(Products::class,'product_id','id');
    }
    public function images(){
        return $this->morphMany(Images::class,'imageable');
    }
}