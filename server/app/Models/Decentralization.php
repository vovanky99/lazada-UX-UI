<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Decentralization extends Model
{
    use HasFactory;
    public $table = 'decentralization';
    protected $fillable = [
        'name',
        'description',
    ];
    public function users(){
        return $this->hasOne(User::class,'decentralization_id','id');
    }
}
