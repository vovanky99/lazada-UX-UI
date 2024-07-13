<?php

namespace App\Models;

use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model implements Viewable
{
    use InteractsWithViews;
    public $table = 'voucher';
    protected $fillable = [
        'name',
        'descriptions',
        'coupon_code',
        'quantity',
        'status',
        'voucher_unit',
        'voucherable_type',
        'voucherable_id',
        'start_day',
        'end_day',
    ];
    public function voucherable(){
        return $this->morphTo();
    }
}