<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessagesShop extends Model
{
    protected $table = 'messages_shop';
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
        'shop_id',
        'user_id',
    ];
    public function shop(){
        return $this->belongsTo(Shop::class,'shop_id');
    }
    public function user(){
        return $this->belongsTo(Shop::class,'use_id');
    }
}