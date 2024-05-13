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
            $table->boolean('status')->default(1)->comment('1:work. 0:has retired');
            $table->string('avatar')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('gender')->nullable();
            $table->dateTime('birthday')->nullable();
            $table->string('citizen_identification_card')->nullable();
            $table->foreignId('permanent_residennce_registration')->nullable()->references('id')->on('address')->onDelete('cascade');
            $table->foreignId('temporary_registration')->nullable()->references('id')->on('address')->onDelete('cascade');
            $table->foreignId('role_id')->default(1)->references('id')->on('role')->onDelete('cascade');
            // $table->timestamp('email_verified_at')->nullable();
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