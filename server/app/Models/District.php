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
        'city_id'
    ];
    public function City(){
        return $this->belongsTo(City::class,'city_id','id');
    }
    public function Ward(){
        return $this->hasMany(Ward::class,'district_id','id');
    }
}