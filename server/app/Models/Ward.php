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
    public function Address(){
        return $this->hasMany(Address::class,'ward_id','id');
    }
}