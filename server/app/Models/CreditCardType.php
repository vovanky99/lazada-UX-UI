<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CreditCardType extends Model
{
    protected $table = 'credit_card_type';
    protected $fillable=[
        'card_name',
    ];
    public function credit_cards(){
        return $this->hasMany(CreditCard::class,'card_type');
    }
}