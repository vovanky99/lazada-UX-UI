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
        Schema::create('article', function (Blueprint $table) {
            $table->id();
            $table->string('title',100);
            $table->string('slug',100);
            $table->boolean('status');
            $table->text('descriptions',500)->nullable();
            $table->longText('content');
            $table->foreignId('category_id')->nullable()->references('id')->on('categories')->onDelete('cascade');
            $table->foreignId('author')->references('id')->on('admin')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article');
    }
};