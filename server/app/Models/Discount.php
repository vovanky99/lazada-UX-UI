<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    public $table = 'discount';
    protected $fillable = [
        'number',
        'status',
        'produt_id',
        'start_time',
        'end_time'
    ];
    public function products(){
        return $this->hasMany(Products::class,'shop_id','id');
    }
}