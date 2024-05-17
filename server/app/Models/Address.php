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
        'wrad_id',
    ];
    public function Users(){
        return $this->belongsTo(User::class,'addressable_id','id');
    }
    public function shop(){
        return $this->belongsTo(Address::class,'address_id');
    }
    public function Ward(){
        return $this->belongsTo(Ward::class,'ward_id','id');
    }
    public function address(){
        return $this->hasOne(User::class,'address_id','id');
    }
    public function adminP(){
        return $this->hasOne(Admin::class,'permanent_residennce_registration','id');
    }
    public function AdminT(){
        return $this->hasOne(Admin::class,'temporary_registration','id');
    }
}