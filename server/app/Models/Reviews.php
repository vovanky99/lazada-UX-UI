<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;
    public $table = 'reviews';
    protected $fillable = [
        'title',
        'status',
        'review_star',
        'content_review',
        'parent_id',
        'usersable_type',
        'usersable_id',
        'productsable_type',
        'productsable_id',
    ];
    public function parent(){
        return $this->belongsTo(Reviews::class,'parent_id','id');
    }
    public function reviews(){
        return $this->morphTo();
    }
    public function images(){
        return $this->morphMany(Images::class,'imageable');
    }
}