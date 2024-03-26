<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressUsers extends Model
{
    use HasFactory;
    protected $table = 'address_users';
    protected $fillable = [
        'user_id',
        'home',
        'street_address_id',
        'wrad_id',
    ];
    public function Users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function Ward(){
        return $this->belongsTo(Ward::class,'ward_id','id');
    }
    public function StreetAddress(){
        return $this->belongsTo(StreetAddress::class,'street_address_id','id');
    }
}