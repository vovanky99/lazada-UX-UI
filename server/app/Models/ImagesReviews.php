<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagesReviews extends Model
{
    use HasFactory;
    public $table = 'images_reviews';
    protected $fillable = [
        'images',
        'review_id',
    ];
    public function reviews(){
        return $this->belongsTo(Reviews::class,'reviews_id','id');
    }
}