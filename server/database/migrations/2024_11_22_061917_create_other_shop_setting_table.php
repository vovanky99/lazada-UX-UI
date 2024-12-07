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
        Schema::create('other_shop_setting', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('a few other shop setting');
            $table->longText('descriptions');
            $table->boolean('is_boolean')->nullable();
            $table->string('is_content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_shop_setting');
    }
};