<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingUnitSizeLimit extends Model
{
    use HasFactory;
    public $table = 'shipping_unit_size_limit';
    protected $fillable = [
        'limit',
        'sp_unit_size_limit_id'
    ];
    public function shipping_unit(){
        return $this->belongsTo(ShippingUnit::class,'sp_unit_size_limit_id','id');
    }
}