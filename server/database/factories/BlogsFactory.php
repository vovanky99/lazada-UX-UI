<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BlogsFactory extends Factory
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
            'desciption'=>fake()->sentence(),
            'content'=>fake()->sentence(1000),
            'img'=>fake()->imageUrl(),
            'status'=>fake()->boolean(),
            'categories_id'=>mt_rand(1,10),
            //
        ];
    }
}
