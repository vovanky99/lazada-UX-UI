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
        Schema::create('shop_shipping_method', function (Blueprint $table) {
            $table->id();
            $table->boolean('cod')->default(1);
            $table->foreignId('shop_id')->references('id')->on('shop')->onDelete('cascade');
            $table->foreignId('shipping_method_id')->references('id')->on('shipping_method')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_shipping_method');
    }
};