<?php

namespace App\Models;

use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model implements Viewable
{
    use HasFactory,InteractsWithViews;
    protected $table = 'blogs';
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