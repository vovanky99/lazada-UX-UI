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
        Schema::create('voucher', function (Blueprint $table) {
            $table->bigIncrements('id')->Unique();
            $table->string('title',50);
            $table->string('descriptions',200);
            $table->string('code',20);
            $table->boolean('status');
            $table->double('percents',2);
            $table->integer('quantity');
            $table->foreignId('category_id')->references('id')->on('categories')->onDelete('cascade')->nullable();
            $table->dateTime('start_day');
            $table->dateTime('end_day');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher');
    }
};