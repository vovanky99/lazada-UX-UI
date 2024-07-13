<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $table = 'notifications';
    protected $fillable = [
        'title',
        'status',
        'type',
        'message',
    ];
    public function notifications_general(){
        return $this->hasMany(NotificationsGeneral::class,'notification_id');
    }
}