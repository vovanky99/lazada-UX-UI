<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;
    public $table = 'payment_method';
    protected $fillable = [
        'title',
        'logo',
        'link',
    ];
}
