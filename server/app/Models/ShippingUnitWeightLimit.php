<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingUnitWeightLimit extends Model
{
    use HasFactory;
    public $table = 'shipping_unit_weight_limit';
    protected $fillable = [
        'limit',
        'sp_unit_weight_limit_id'
    ];
    public function sp_unit_weight(){
        return $this->belongsTo(ShippingUnit::class,'sp_unit_weight_limit_id','id');
    }
}