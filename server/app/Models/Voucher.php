<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
    public $table = 'voucher';
    protected $fillable = [
        'name',
        'descriptions',
        'code',
        'percents',
        'quantity',
        'status',
        'category_id',
        'start_day',
        'end_day',
    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id','id');
    }
}