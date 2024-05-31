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
    ];
    public function categories(){
        return $this->belongsToMany(Categories::class,CategoryBlog::class,'blog_id','category_id');
    }
}