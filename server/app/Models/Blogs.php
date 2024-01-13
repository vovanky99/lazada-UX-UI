<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;
    public $table = 'blogs';
    protected $fillable = [
        'title',
        'descriptions',
        'content',
        'img',
        'status',
        'categories_id',
    ];
    public function categories(){
        return $this->belongsTo(Categories::class,'categories_id','id');
    }
}