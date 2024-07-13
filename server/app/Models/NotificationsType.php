<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationsType extends Model
{
    protected $table = 'notifications_type';
    protected $fillable = [
        'name',
        'descriptions',
        'parent_id',
    ];
    public function setting_notifications(){
        return $this->hasMany(SettingNotifications::class,'notification_type_id');
    }
}