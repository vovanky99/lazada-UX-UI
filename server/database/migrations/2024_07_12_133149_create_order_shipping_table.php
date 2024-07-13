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
        Schema::create('order_shipping', function (Blueprint $table) {
            $table->id();
            $table->string('content',100);
            $table->double('weight',6)->unsigned()->comment('Weight (After packing) gram');
            $table->double('packing_size_height',4)->unsigned()->comment('unit cm');
            $table->double('packing_size_width',4)->unsigned()->comment('unit cm');
            $table->double('packing_size_length',4)->unsigned()->comment('unit cm');
            $table->foreignId('shipping_warehouse')->nullable()->references('id')->on('warehouse')->onDelete('cascade');
            $table->foreignId('order_id')->references('id')->on('order_cart')->onDelete('cascade');
            $table->foreignId('shipping_method_id')->references('id')->on('shipping_method')->onDelete('cascade');
            $table->foreignId('shipping_unit_id')->references('id')->on('shipping_unit')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_shipping');
    }
};