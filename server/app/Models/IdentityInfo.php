<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdentityInfo extends Model
{
    protected $table ='identity_Info';
    protected $fillable =[
        'type',
        'identity_number',
        'fullname',
        'identity_image',
        'identity_hold_image',
        'status',
        'identitiesable_id',
        'identitiesable_type',
    ];
    
    public function imageable(){
        return $this->morphTo();
    }
}