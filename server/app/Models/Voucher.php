<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
    public $table = 'voucher';
    protected $fillable = [
        'title',
        'descriptions',
        'code',
        'percents',
        'quantity',
        'category_id',
        'start_day',
        'end_day',
    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id','id');
    }
}