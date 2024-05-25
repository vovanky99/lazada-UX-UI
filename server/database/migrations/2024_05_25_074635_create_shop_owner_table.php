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
        Schema::create('shop_owner', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('username');
            $table->string('password');
            $table->string('phone_number');
            $table->string('avatar')->nullable();
            $table->dateTime('birthday')->nullable();
            $table->string('description')->nullable();
            $table->boolean('is_owner')->default(1)->comment('0:is owner 1:is manager 2:is member');
            $table->foreignId('address_id')->references('id')->on('address')->onDelete('cascade');
            $table->foreignId('shop_id')->references('id')->on('shop')->onDelete('cascade');
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
        Schema::table('shop',function(Blueprint $table){
            $table->foreignId('shop_owner_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shop',function(Blueprint $table){
            $table->dropForeign(['shop_owner_id']);
        });
        Schema::dropIfExists('shop_owner');
    }
};