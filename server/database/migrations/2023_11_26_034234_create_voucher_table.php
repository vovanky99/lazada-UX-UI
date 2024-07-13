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
        Schema::create('voucher', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name',100);
            $table->string('descriptions',200)->nullable();
            $table->double('type',1)->comment('1:life shop 2:seller');
            $table->string('coupon_code',5)->index();
            $table->boolean('status')->default(1);
            $table->double('voucher_unit',2)->unsigned();
            $table->double('quantity')->unsigned()->nullable()->comment('null:unlimmited');
            $table->morphs('voucherable');
            $table->dateTime('start_day');
            $table->dateTime('end_day');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher');
    }
};