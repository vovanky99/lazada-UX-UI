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
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id')->Unique();
            $table->string('title',50);
            $table->string('image');
            $table->double('price');
            $table->double('discount',100);
            $table->double('quantities');
            $table->bigInteger('products_sold');
            $table->string('descriptions');
            // $table->integer('categories_id')->unsigned();
            $table->foreignId('categories_id')->references('id')->on('categories')->onDelete('cascade');
            // $table->integer('shop_id')->unsigned();
            $table->foreignId('shop_id')->references('id')->on('shop')->onDelete('cascade');
            // $table->integer('product_types_id')->unsigned()->nullable();
            $table->foreignId('products_type_id')->references('id')->on('products_type')->onDelete('cascade')->nullable();
            $table->foreignId('products_type_id1')->references('id')->on('products_type')->onDelete('cascade')->null();
            $table->foreignId('products_type_id2')->references('id')->on('products_type')->onDelete('cascade')->null();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};