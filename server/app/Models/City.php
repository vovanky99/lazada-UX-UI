<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $table = 'city';
    protected $fillable = [
        'name',
        'area',
        'country_id'
    ];
    public function country(){
        return $this->belongsTo(Country::class,'country_id','id');
    }
    public function districts(){
        return $this->hasMany(District::class,'city_id','id');
    }
}