<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributesDetailTranslation extends Model
{
    protected $table="attributes_detail_translation";
    protected $fillable = [
        'name',
        'attribute_detail_id',
        'language_id',
    ];
    public function attribute(){
        return $this->belongsTo(AttributesDetail::class,'attribute_detail_id');
    }
    public function language(){
        return $this->belongsTo(Languages::class,'language_id');
    }
}