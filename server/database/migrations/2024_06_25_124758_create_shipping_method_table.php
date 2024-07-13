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
        Schema::create('shipping_method', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->double('maximum_of_1_side')->unsigned()->nullable()->comment('Maximum limit of 1 side (cm)');
            $table->double('weight_limit')->unsigned()->nullable()->comment('Weight limit (kg)');
            $table->double('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_method');
    }
};