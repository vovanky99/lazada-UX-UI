<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    protected $table = 'messages';
    protected $fillable = [
        'content',
        'read_status',
        'Attachment',
        'MessageType',
        'status',
        'flagged',
        'reaction',
        'mentioned_users',
        'tags',
        'location',
        'file_metadata',
        'forwarding_history',
        'edit_history',
        'read_receipts',
        'expiry_time',
        'sender_id',
        'receiver_id',
    ];
    public function sender(){
        return $this->belongsTo(User::class,'sender_id');
    }
    public function receiver(){
        return $this->belongsTo(User::class,'receiver_id');
    }
}