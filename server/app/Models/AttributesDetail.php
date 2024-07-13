<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributesDetail extends Model
{
    public $table = 'attributes_detail';
    protected $fillable =[
        'name','attributes_detail_id'
    ];
    public function attribute(){
        return $this->belongsTo(Attributes::class,'attributes_id');
    }
    public function attributes_product(){
        return $this->belongsTo(AttributesProduct::class,'attributes_detail_id');
    }
}