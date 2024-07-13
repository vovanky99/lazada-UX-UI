<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model 
{
    public $table = 'article';
    protected $fillable = [
        'title',
        'slug',
        'status',
        'descriptions',
        'content',
        'category_id',
        'author',
    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id');
    }
}