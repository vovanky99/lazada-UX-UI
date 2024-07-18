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
        Schema::create('attributes_detail_translation', function (Blueprint $table) {
            $table->string('name')->index();
            $table->foreignId('attribute_detail_id')->references('id')->on('attributes_detail')->onDelete('cascade');
            $table->foreignId('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes_detail_translation');
    }
};