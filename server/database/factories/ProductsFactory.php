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
            'title'=>fake()->name(),
            'image'=>fake()->imageUrl(),
            'price'=>mt_rand(1000,10000000),
            'quantities'=>mt_rand(1,1000),
            'descriptions'=>fake()->sentence(20),
            'reviews_stars'=>mt_rand(1,5),
            'categories_id'=>mt_rand(1,10),
            'shop_id'=>mt_rand(1,10),
            'products_type_id'=>mt_rand(1,10),
            //
        ];
    }
}
