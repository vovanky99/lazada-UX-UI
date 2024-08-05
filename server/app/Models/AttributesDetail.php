<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributesDetail extends Model
{
    public $table = 'attributes_detail';
    protected $fillable =[
        'attribute_id'
    ];
    public function attribute(){
        return $this->belongsTo(Attributes::class,'attribute_id');
    }
    public function attributes_product(){
        return $this->hasMany(AttributesProduct::class,'attributes_detail_id');
    }
    public function attributes_detail_translation(){
        return $this->hasMany(AttributesDetailTranslation::class,'attribute_detail_id');
    }
}