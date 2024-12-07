<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherShopSetting extends Model
{
    use HasFactory;
    public $table='other_shop_setting';
    protected $filable = [
        'name',
        'descriptions',
        'is_boolean',
        'is_content',
    ];
}