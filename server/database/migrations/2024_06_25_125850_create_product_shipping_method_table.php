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
        Schema::create('product_shipping_method', function (Blueprint $table) {
            $table->foreignId('order_id')->references('id')->on('order_cart')->onDelete('cascade');
            $table->foreignId('shipping_method_id')->references('id')->on('shipping_method')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_shipping_method');
    }
};