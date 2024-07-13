<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attributes extends Model
{
    public $table = 'attributes';
    protected $fillable = [
        'name',
        'category_id',
    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id');
    }
    public function attributes_detail(){
        return $this->hasMany(AttributesDetail::class,'attributes_id');
    }
}