<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    protected $table = 'credit_card';
    protected $fillable=[
        'card_number',
        'card_type',
        'credit_cardable_type',
        'credit_cardable_id',
    ];
    public function credit_cardable(){
        return $this->morphTo();
    }
    public function credit_card_type(){
        return $this->belongsTo(CreditCardType::class,'card_type');
    }
    public function address(){
        return $this->morphMany(Address::class,'addressable');
    }
}