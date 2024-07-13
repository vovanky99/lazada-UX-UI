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
        Schema::create('credit_card', function (Blueprint $table) {
            $table->id();
            $table->string('name',20)->nullable();
            $table->string('card_number',20);
            $table->string('postal_code',20)->nullable();
            $table->foreignId('card_type')->references('id')->on('credit_card_type')->onDelete('cascade');
            $table->morphs('credit_cardable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_card');
    }
};