<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ReviewsFactory extends Factory
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
            'reviews_stars'=>mt_rand(1,5),
            'content_reviews'=>fake()->sentence(),
            'parent_id'=>mt_rand(0,100),
            'users_id'=>mt_rand(1,100),
            'products_id'=>mt_rand(1,32),
            //
        ];
    }
}