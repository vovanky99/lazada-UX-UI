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
        'national_id'
    ];
    public function National(){
        return $this->belongsTo(National::class,'national_id','id');
    }
    public function District(){
        return $this->hasMany(District::class,'city_id','id');
    }
}