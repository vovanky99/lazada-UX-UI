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
        Schema::create('discount', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('number',2);
            $table->boolean('status')->default(1);
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('products',function(Blueprint $table){
            $table->foreignId('discount_id')->nullable()->references('id')->on('discount')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    { 
        Schema::table('products',function(Blueprint $table){
        $table->dropForeign(['discount_id']);
        });
        Schema::dropIfExists('discount');
       
    }
};