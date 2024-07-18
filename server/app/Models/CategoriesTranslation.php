<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriesTranslation extends Model
{
    protected $table = 'categories_translation';
    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'language_id',
    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id');
    }
    public function language(){
        return $this->belongsTo(Languages::class,'language_id');
    }
}