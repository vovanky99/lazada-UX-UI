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
        Schema::create('order_cart', function (Blueprint $table) {
            $table->bigIncrements('id')->Unique();
            $table->double('quantity')->nullable();
            $table->double('status',2)->comment('0:in cart 1:order cart&wait for confirmation 2:confirmation 3:waiting for the goods& 4:processed&is in transit 
            5:waiting for delivery 6:application has been cancelled 7:return&refund 8:Delivery failed 9:Successful delivery 10:temporarily locked ')->default(0);
            $table->foreignId('payment_id')->nullable()->unsigned()->references('id')->on('payment')->onDelete('cascade');
            $table->foreignId('user_id')->unsigned()->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_cart');
    }
};