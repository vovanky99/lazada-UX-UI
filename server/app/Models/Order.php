<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $table = 'order';
    protected $fillable = [
        'status',
        'payment_id',
        'user_id',
    ];
    public function payment(){
        return $this->belongsTo(Payment::class,'payment_id','id');
    }
    public function users(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function orderProducts(){
        return $this->hasMany(OrderProducts::class,'order_id','id');
    }
}