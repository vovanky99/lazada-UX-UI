<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreetAddress extends Model
{
    use HasFactory;
    protected $table = 'street_address';
    protected $fillable = [
        'name',
    ];
    public function AddressUsers(){
        return $this->hasMany(AddressUsers::class,'street_address_id','id');
    }
    public function Shop(){
        return $this->hasMany(Shop::class,'street_address_id','id');
    }
   
}