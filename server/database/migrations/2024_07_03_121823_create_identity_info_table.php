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
        Schema::create('identity_info', function (Blueprint $table) {
            $table->id();
            $table->double('type',1)->unsigned()->comment('1:CCCD 2:CMND 3:Passport')->default(1);
            $table->double('status')->unsigned()->default(1);
            $table->string('identity_number',20);
            $table->string('fullname');
            $table->string('identity_image');
            $table->string('identity_hold_image');
            $table->morphs('identitiesable');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('identity_info');
    }
};