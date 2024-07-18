<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'country';
    protected $fillable = [
        'name',
        'international_codes',
        'acronym',
        'language_id'
    ];
    public function cities(){
        return $this->hasMany(City::class,'country_id','id');
    }
    public function language(){
        return $this->belongsTo(Languages::class,'language_id');
    }
}