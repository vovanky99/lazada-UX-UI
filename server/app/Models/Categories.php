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
        'title',
        'parent_id',
    ];
    public function getLftName()
    {
        return '_lft';
    }

    public function getRgtName()
    {
        return '_rgt';
    }

    public function getParentIdName()
    {
        return 'parent_id';
    }

    // Specify parent id attribute mutator
    public function setParentAttribute($value)
    {
        $this->setParentIdAttribute($value);
    }
    public function categories()
    {
        return $this->hasMany(Categories::class,'parent_id','id');
    }
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