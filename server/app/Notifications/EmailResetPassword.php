<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmailResetPassword extends Notification
{
    public $token,$email;
    public function __construct($token,$email)
    {
        $this->token = $token;
        $this->email = $email;
    }
    public function via($notifiable){
        return ['mail'];
    }
    public function toMail($notifiable){
        $url = env('FRONTEND_URL').'seller/password/reset?token='.$this->token.'&email='.$notifiable->getEmailForPasswordReset();
        return (new MailMessage)->subject('Your Reset Password Subject Here')->line('You are receiving this email because we received a password reset request for your account.')
        ->action('Reset Password',url($url))
        ->line('If you did not request a password reset, no further action is required.');
    }
}