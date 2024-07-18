<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attributes extends Model
{
    public $table = 'attributes';
    protected $fillable = [
        'category_id',
    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id');
    }
    public function attributes_detail(){
        return $this->hasMany(AttributesDetail::class,'attribute_id');
    }
    public function attribute_translation(){
        return $this->hasMany(AttributesTranslation::class,'attribute_id');
    }
}