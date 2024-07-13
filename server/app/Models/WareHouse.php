<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WareHouse extends Model 
{
    public $table = 'warehouse';
    protected $fillable = [
        'name',
        'status',
    ];
    public function address(){
        return $this->morphMany(Address::class,'imageable');
    }
}