<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use User;

class Address extends Model
{
    use HasFactory;
    protected $table = 'address';
    protected $fillable = [
        'addressable_id',
        'addressable_type',
        'home',
        'phone',
        'street_address',
        'ward_id',
    ];
    public function user(){
        return $this->belongsTo(User::class,'address_id','id');
    }
    public function shop(){
        return $this->hasOne(Address::class,'address_id');
    }
    public function ward(){
        return $this->belongsTo(Ward::class,'ward_id');
    }
    public function admin_p(){
        return $this->hasOne(Admin::class,'permanent_residennce_registration','id');
    }
    public function admin_t(){
        return $this->hasOne(Admin::class,'temporary_registration','id');
    }
    public function seller(){
        return $this->hasOne(Address::class,'address_id','id');
    }
}