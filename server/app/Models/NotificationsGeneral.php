<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationsGeneral extends Model
{
    protected $table = 'notifications_general';
    protected $fillable = [
        'title',
        'is_read',
        'notification_id',
        'notificationable_type',
        'notificationable_id',
    ];
    public function notification_generalable(){
        return $this->morphTo();
    }
    public function notification(){
        return $this->belongsTo(Notifications::class,'notification_id');
    }
}