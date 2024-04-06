<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Messages>
 */
class MessagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
        'content'=>fake()->text(),
        'read_status'=>fake()->boolean(),
        'Attachment'=>fake()->sentence(5),
        'MessageType'=>fake()->mimeType(),
        'status'=>fake()->boolean(),
        'reaction'=>fake()->emoji(),
        'sender_id'=>mt_rand(1,10),
        'receiver_id'=>mt_rand(1,10),
        ];
    }
}