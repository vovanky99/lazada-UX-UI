<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SettingNotifications extends Model
{
    protected $table='setting_notifications';
    protected $fillable= [
        'notification_type_id',
        'status',
        'setting_notificationable_type',
        'setting_notificationable_id',
    ];
    public function setting_notificationable(){
        return $this->morphTo();
    }
    public function notification_type(){
        return $this->belongsTo(NotificationsType::class,'notification_type_id');
    }
}