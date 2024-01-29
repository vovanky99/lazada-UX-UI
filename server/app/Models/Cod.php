<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cod extends Model
{
    use HasFactory;
    public $table = 'cod';
    protected $fillable = [
        'txn_id',
        'status',
        'amount'
    ];
    public function payment(){
        return $this->hasMany(Payment::class,'cod_id','id');
    }
}