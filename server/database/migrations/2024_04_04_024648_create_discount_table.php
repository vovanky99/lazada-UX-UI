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
            $table->string('coupon_code',10)->index();
            $table->double('discount_unit',2)->unsigned();
            $table->double('minimun_order_value')->unsigned();
            $table->double('maximum_discount_amount')->unsigned();
            $table->boolean('status')->default(1);
            $table->dateTime('start_valid');
            $table->dateTime('valid_until');
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