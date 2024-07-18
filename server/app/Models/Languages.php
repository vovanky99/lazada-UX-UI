<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Languages extends Model
{
    protected $table = 'languages';
    protected $fillable = [
        'name',
        'acronym',
    ];
    public function countries(){
        return $this->hasMany(Languages::class,'language_id');
    }
    public function categories_translation(){
        return $this->hasMany(CategoriesTranslation::class,'language_id');
    }
    public function attribute_detail_translation(){
        return $this->hasMany(AttributesDetailTranslation::class,'language_id');
    }
    public function attribute_translation(){
        return $this->hasMany(AttributesTranslation::class,'language_id');
    }
}