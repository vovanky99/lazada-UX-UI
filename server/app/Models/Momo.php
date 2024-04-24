<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Momo extends Model
{
    use HasFactory;
    public $table = 'momo';
    protected $fillable = [
        'txn_id',
        'status',
        'amount',
    ];
    public function payment(){
        return $this->morphMany(Payment::class,'paymentable');
    }
}