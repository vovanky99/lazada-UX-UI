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
        Schema::create('department', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->boolean('status')->default(1);
            $table->string('descriptions')->nullable();
            $table->timestamps();
        });
        Schema::table('admin',function(Blueprint $table){
            $table->foreignId('department_id')->nullable()->references('id')->on('department')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('admin',function(Blueprint $table){
            $table->dropForeign(['department_id']);
        });
        Schema::dropIfExists('department');
    }
};