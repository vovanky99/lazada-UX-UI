<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Categories extends Model
{
    use HasFactory;
    public $table = 'categories';
    protected $fillable = [
        'name',
        'slug',
        '_lft',
        '_rgt',
        'parent_id',
        'status'
    ];
    public function childrens()
    {
        return $this->hasMany(Categories::class,'parent_id','id');
    }
    public function categories_translation(){
        return $this->hasMany(CategoriesTranslation::class,'category_id');
    }
    public function parent(){
        return $this->belongsTo(Categories::class,'parent_id','id');
    }
    public function children_recursive(){
        return $this->childrens()->with('children_recursive');
    }
    public function blogs(){
        return $this->hasManyThrough(Blogs::class,CategoryBlog::class);
    }
    public function slide(){
        return $this->belongsTo(Slide::class,'category_id','id');
    }
    public function products(){
        return $this->hasMany(Products::class,'category_id','id');
    }
    public function voucher(){
        return $this->belongsTo(Voucher::class,'category_id','id');
    }
    public function attributes(){
        return $this->hasMany(Attributes::class,'category_id');
    }
    public function article(){
        return $this->hasMany(Article::class,'category_id');
    }
}