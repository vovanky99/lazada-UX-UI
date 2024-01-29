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
        Schema::create('payment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('status');
            $table->foreignId('cod_id')->nullable()->unsigned()->references('id')->on('cod')->onDelete('cascade');
            $table->foreignId('momo_id')->nullable()->unsigned()->references('id')->on('momo')->onDelete('cascade');
            $table->dateTimeTz('payment_datetime');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment');
    }
};