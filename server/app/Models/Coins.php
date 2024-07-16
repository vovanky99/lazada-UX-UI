<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coins extends Model
{
    protected $table = 'coins';
    protected $fillable = [
        'name',
        'symbol',
        'value',
    ];
    public function coins_owner(){
        return $this->hasMany(CoinsOwner::class,'coins_id');
    }
}