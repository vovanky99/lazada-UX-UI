<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    public $table = 'role';
    protected $fillable = [
        'name',
        'status',
        'descriptions',
    ];
    public function admins(){
        return $this->hasMany(Admin::class,'role_id','id');
    }
}