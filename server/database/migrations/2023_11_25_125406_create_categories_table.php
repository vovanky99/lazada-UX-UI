<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Kalnoy\Nestedset\NestedSet;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id')->Unique();
            $table->string('title',50);
            NestedSet::columns($table);
            $table->timestamps();
        });
        DB::unprepared('CREATE PROCEDURE addnode(IN id,IN title,IN parentId)
        BEGIN
            Select @myRight:=_rgt from categories where id = parentId
        END');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};