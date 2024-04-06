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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->longText('content')->nullable();
            $table->boolean('read_status')->default(0);
            $table->string('Attachment')->nullable(); // or appropriate data type for storing file references
            $table->string('MessageType')->default('text');
            $table->boolean('status');
            /* Optional Metadata*/
            $table->boolean('flagged')->default(0);
            $table->string('reaction');//Store reaction as text or reference another table for predefined reactions
            $table->string('mentioned_users')->nullable();//Store mentioned users as comma-separated values or reference another table
            $table->string('tags')->nullable(); //Store tags as comma-separated values or reference another table
            $table->string('location')->nullable();
            $table->jsonb('file_metadata')->nullable(); //Store attachment metadata as JSON or text
            $table->jsonb('forwarding_history')->nullable();//Store forwarding history as JSON or text
            $table->jsonb('edit_history')->nullable();//Store edit history as JSON or text
            $table->jsonb('read_receipts')->nullable(); //Store read receipts as JSON or text
            $table->dateTime('expiry_time')->nullable();
            /*Add any additional fields as needed */
            $table->foreignId('sender_id')->unsigned()->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->unsigned()->references('id')->on('users')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};