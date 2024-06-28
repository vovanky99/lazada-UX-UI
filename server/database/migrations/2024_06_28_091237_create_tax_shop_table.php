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
        Schema::create('tax_shop', function (Blueprint $table) {
            $table->id();
            $table->string('business_name'); 
            $table->double('type')->comment('1:individual 2:household_business 3:business');
            $table->double('tax_code',14);
            $table->foreignId('registered_business_address_id')->references('id')->on('address')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tax_shop');
    }
};