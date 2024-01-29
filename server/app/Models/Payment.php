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
        'cod_id',
        'momo_id'
    ];
    public function cod(){
        return $this->belongsTo(Cod::class,'cod_id','id');
    }
    public function momo(){
        return $this->belongsTo(Momo::class,'momo_id','id');
    }
    public function order(){
        return $this->hasMany(Order::class,'payment_id','id');
    }
}