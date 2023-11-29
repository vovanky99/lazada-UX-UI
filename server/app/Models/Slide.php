<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use HasFactory;
    public $table = 'slide';
    protected $fillable = [
        'title',
        'descriptions',
        'img',
        'categories_id',
        'start_day',
        'end_day',
    ];
    public function categories(){
        return $this->belongsTo(Categories::class,'categories_id','id');
    }
}
