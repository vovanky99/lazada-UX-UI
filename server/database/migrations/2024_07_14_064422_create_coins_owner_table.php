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
        Schema::create('coins_owner', function (Blueprint $table) {
            $table->id();
            $table->foreignId('coins_id')->references('id')->on('coins')->onDelete('cascade');
            $table->morphs('coins_ownerable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coins_owner');
    }
};