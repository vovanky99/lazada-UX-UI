<?php

namespace Database\Factories;

use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SlideFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->name(),
            'descriptions'=>fake()->sentence(20),
            'img'=>fake()->imageUrl(),
            'category_id'=>mt_rand(1,10),
            'start_day'=>fake()->date(),
            'end_day'=>fake()->date(),
            //
        ];
    }
}