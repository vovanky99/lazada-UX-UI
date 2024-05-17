<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;
    protected $table = 'district';
    protected $fillable = [
        'name',
        'fee_ship',
        'city_id'
    ];
    public function cities(){
        return $this->belongsTo(City::class,'city_id','id');
    }
    public function wards(){
        return $this->hasMany(Ward::class,'district_id','id');
    }
    // public function District(){
    //     return $this->hasManyThrough(City::class,District::class);
    // }
}