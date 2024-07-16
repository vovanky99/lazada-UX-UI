<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoinsOwner extends Model
{
    protected $table = 'coins_owner';
    protected $fillable = [
        'coins_id',
        'coins_ownerable'
    ];
    public function coins_ownerable(){
        return $this->morphTo();
    }
    public function Coins(){
        return $this->belongsTo(Coins::class,'coins_id');
    }
}