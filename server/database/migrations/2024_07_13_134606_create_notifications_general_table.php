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
        Schema::create('notifications_general', function (Blueprint $table) {
            $table->id();
            $table->string('title',100);
            $table->boolean('is_read')->default(false);
            $table->foreignId('notification_id')->references('id')->on('notifications')->onDelete('cascade');
            $table->morphs('notificationable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};