<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SettingNotifications extends Model
{
    protected $table='setting_notifications';
    protected $fillable= [
        'notification_type_id',
        'status',
        'st_ntfctable_type',
        'st_ntfctable_id',
    ];
    public function setting_notificationable(){
        return $this->morphTo();
    }
    public function notification_type(){
        return $this->belongsTo(NotificationsType::class,'notification_type_id');
    }
}