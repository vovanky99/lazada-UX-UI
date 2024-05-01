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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username');
            $table->string('password');
            $table->string('avatar');
            $table->double('phone_number');
            $table->boolean('gender');
            $table->dateTime('birthday');
            $table->string('citizen_identification_card');
            $table->foreignId('permanent_residennce_registration')->nullable()->references('id')->on('address')->onDelete('cascade');
            $table->foreignId('temporary_registration')->nullable()->references('id')->on('address')->onDelete('cascade');
            $table->foreignId('role_id')->references('id')->on('role')->onDelete('cascade');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};