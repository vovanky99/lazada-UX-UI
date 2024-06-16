<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SellerVerifyEmail extends Notification
{
    protected function verificationUrl($notifiable){
        return url(route('seller.verification.verify',[
            'id'=>$notifiable->getKey(),
            'hash'=>sha1($notifiable->getEmailForVerification()),
        ],false));
    }
    public function toMail($notifiable){
        $verificationUrl = $this->verificationUrl($notifiable);
        return  (new MailMessage)->subject('Verify Your Email Address')
                ->line('Please click the button below to verify your email address.')
                ->action('Verify Email Address',  $verificationUrl)
                ->line('If you did not create an account, no further action is required.');
    }
    public function via($notifiable){
        return ['mail'];
    }
}