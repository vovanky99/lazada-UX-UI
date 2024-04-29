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
    public function Address(){
        return $this->hasMany(Address::class,'street_address_id','id');
    }
   
}