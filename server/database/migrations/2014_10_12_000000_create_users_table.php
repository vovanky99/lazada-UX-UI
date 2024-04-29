<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rules\Unique;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id')->Unique();
            $table->string('name');
            $table->string('username')->nullable();
            $table->string('email')->Unique();
            $table->string('phone_number')->nullable();
            $table->text('password')->nullable();
            $table->string('avatar')->nullable();
            $table->double('level',10)->nullable();
            $table->double('status')->nullable();
            $table->boolean('gender');
            $table->date('birthday')->nullable();
            $table->datetime('register_date')->nullable();
            $table->foreignId('role_id')->default('2')->references('id')->on('role')->onDelete('cascade');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Procedure
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};