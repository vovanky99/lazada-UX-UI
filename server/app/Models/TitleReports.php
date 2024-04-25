<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TitleReports extends Model
{
    protected $table ='title_reports';
    protected $fillable = [
        'title',
    ];
    public function reports_product(){
        return $this->hasMany(TitleReports::class,'title_id');
    }
}