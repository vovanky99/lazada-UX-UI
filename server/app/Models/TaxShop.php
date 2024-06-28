<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxShop extends Model
{
    protected $table ='tax_shop';
    protected $fillable = [
        'type',
        'tax_code',
        'registered_business_address_id',
    ];
}