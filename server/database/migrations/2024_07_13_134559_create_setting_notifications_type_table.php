<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('setting_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('notification_type')->references('id')->on('notifications')->onDelete('cascade');
            $table->boolean('status')->comment('1:enabled 0:disabled')->default(1);
            $table->morphs('st_ntfctable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_notifications');
    }
};