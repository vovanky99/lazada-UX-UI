<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=>fake()->sentence(15),
            'images'=>fake()->imageUrl(),
            'price'=>mt_rand(1000,10000000),
            'status'=>fake()->boolean(),
            'quantities'=>mt_rand(1,1000),
            'descriptions'=>fake()->sentence(200),
            'discount_id'=>mt_rand(1,50),
            'category_id'=>mt_rand(1,15),
            'shop_id'=>mt_rand(1,100),
            //
        ];
    }
}