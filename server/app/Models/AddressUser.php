<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressUser extends Model
{
    use HasFactory;
    protected $table = 'address_user';
    protected $fillable =[
        'address_id',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function address(){
        return $this->belongsTo(User::class,'user_id');
    }
}