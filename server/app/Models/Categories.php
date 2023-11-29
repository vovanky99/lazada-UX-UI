<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;
    public $table = 'categories';
    protected $fillable = [
        'title',
        'description',
        'parent_id',
    ];
    public function blogs(){
        return $this->hasMany(Blogs::class,'categories_id','id');
    }
    public function slide(){
        return $this->belongsTo(Slide::class,'categories_id','id');
    }
    public function products(){
        return $this->hasMany(Products::class,'categories_id','id');
    }
    public function voucher(){
        return $this->belongsTo(Voucher::class,'categories_id','id');
    }
}
