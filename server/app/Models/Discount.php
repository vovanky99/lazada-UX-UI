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
        'start_time',
        'end_time'
    ];
    public function products(){
        return $this->hasMany(Products::class,'discount_id','id');
    }
}