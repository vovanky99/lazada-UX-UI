<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    public $table = 'payment';
    protected $fillable = [
        'status',
        'payment_datetime',
        'paymentable_id',
        'paymentable_type',
    ];
    public function paymentable(){
        return $this->morphTo();
    }
    public function order(){
        return $this->hasMany(OrderCart::class,'payment_id','id');
    }
}