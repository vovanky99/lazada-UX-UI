<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailReceiveElectronicInvoice extends Model
{

    protected $table ='email_receive_electronic_invoice';
    protected $fillable = [
        'email',
        'tax_shop_id',
    ];
    public function tax_shop(){
        return $this->belongsTo(TaxShop::class,'tax_shop_id');
    }
}