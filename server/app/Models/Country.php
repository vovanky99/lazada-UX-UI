<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;

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
    // public function paginateCites($perPage = 10, $page = null){
    //     $page = $page ?: (Paginator::resolveCurrentPage()?:1);
    //     $cities = $this->cities()->paginate($perPage,['*'],'city_page',$page);
    //     return $cities;
    // }
    public function language(){
        return $this->belongsTo(Languages::class,'language_id');
    }
}