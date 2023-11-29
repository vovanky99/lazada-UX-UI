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
        'description',
        'content',
        'img',
        'status',
        'categories_id',
    ];
    public function categories(){
        return $this->belongsTo(Blogs::class,'categories_id','id');
    }
}
