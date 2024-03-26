<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;
    protected $table = 'ward';
    protected $fillable = [
        'name',
        'district_id'
    ];
    public function District(){
        return $this->belongsTo(District::class,'district_id','id');
    }
    public function AddressUsers(){
        return $this->hasMany(AddressUsers::class,'ward_id','id');
    }
    public function Shop(){
        return $this->hasMany(Shop::class,'ward_id','id');
    }
}