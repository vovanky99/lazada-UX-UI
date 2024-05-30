<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'department';
    protected $fillable = [
        'name',
        'status',
        'description',
        'manager_id',   
    ];
    public function admins(){
        return $this->hasMany(Admin::class,'department_id','id');
    }
}