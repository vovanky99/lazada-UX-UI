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
        Schema::create('product_type_detail', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->boolean('status')->default(1);
            $table->double('price')->nullable();
            $table->double('quantity_in_stock')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('product_type_id')->references('id')->on('product_type')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_type_detail');
    }
};