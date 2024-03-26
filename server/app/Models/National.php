<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class National extends Model
{
    use HasFactory;
    protected $table = 'national';
    protected $fillable = [
        'name',
    ];
    public function City(){
        return $this->hasMany(City::class,'national_id','id');
    }
}