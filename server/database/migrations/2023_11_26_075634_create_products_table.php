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
            $table->bigIncrements('id');
            $table->string('name')->index();
            $table->string('image');
            $table->boolean('pre_order_goods')->default(0);
            $table->double('number_of_days_to_pre_order')->nullable()->default(2);
            $table->boolean('conditions_of_goods')->default(1)->comment('0:used 1:new product');
            $table->string('video')->nullable();
            $table->double('price')->unsigned();
            $table->double('quantity_in_stock')->unsigned();
            $table->string('sku',30)->nullable();
            $table->double('status',1)->unsigned()->comment('0:hide 1:show 2:locked')->default(1);
            $table->longText('descriptions',3000)->nullable();
            $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreignId('shop_id')->references('id')->on('shop')->onDelete('cascade');
            $table->softDeletes();
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