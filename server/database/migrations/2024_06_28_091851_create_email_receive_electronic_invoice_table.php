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
        Schema::create('email_receive_electronic_invoice', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->foreignId('tax_shop_id')->references('id')->on('tax_shop')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_receive_electronic_invoice');
    }
};