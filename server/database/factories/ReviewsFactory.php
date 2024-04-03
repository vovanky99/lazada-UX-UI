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
            'review_star'=>mt_rand(1,5),
            'content_review'=>fake()->sentence(),
            'parent_id'=>mt_rand(0,100),
            'user_id'=>mt_rand(1,100),
            'product_id'=>mt_rand(1,32),
            //
        ];
    }
}