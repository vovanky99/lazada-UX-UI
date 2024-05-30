<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportsProduct extends Model
{
    use HasFactory;
    protected $table ='reports_product';
    protected $fillable = [
        'title_id',
        'content',
        'status',
        'user_id',
        'product_id',
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function title_reports(){
        return $this->belongsTo(TitleReports::class,'title_id');
    }
    public function product(){
        return $this->belongsTo(Products::class,'product_id');
    }
}