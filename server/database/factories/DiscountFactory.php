<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number'=>mt_rand(1,50),
            'status'=>fake()->boolean(),
            'start_time'=>fake()->dateTime(),
            'end_time'=>fake()->dateTime(),
        ];
    }
}