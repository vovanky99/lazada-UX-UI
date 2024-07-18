<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttributesTranslation extends Model
{
    protected $table = 'attributes_translation';
    protected $fillable =[
        'name',
        'attribute_id',
        'language_id',
    ];
    public function attribute(){
        return $this->belongsTo(Attributes::class,'attribute_id');
    }
    public function language(){
        return $this->belongsTo(Languages::class,'language_id');
    }
}