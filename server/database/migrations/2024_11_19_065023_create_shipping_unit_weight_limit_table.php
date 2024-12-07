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
        Schema::create('shipping_unit_weight_limit', function (Blueprint $table) {
            $table->id();
            $table->integer('limit')->comment('kg');
            $table->foreignId('sp_unit_weight_limit_id')->references('id')->on('shipping_unit')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_unit_weight_limit');
    }
};