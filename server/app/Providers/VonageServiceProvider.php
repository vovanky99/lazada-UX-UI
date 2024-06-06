<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Vonage\Client;
use Vonage\Client\Credentials\Basic;

class VonageServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Client::class,function($app){
            $app = new Basic(env('NEXMO_KEY'),env('NEXMO_SECRET'));
            return new Client($app);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}