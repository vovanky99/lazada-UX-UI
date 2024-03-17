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
            'discount'=>mt_rand(1,100),
            'status'=>fake()->boolean(),
            'quantities'=>mt_rand(1,1000),
            'descriptions'=>fake()->sentence(40),
            'categories_id'=>mt_rand(1,15),
            'shop_id'=>mt_rand(1,100),
            'products_type_id'=>mt_rand(1,5),
            'products_type_id1'=>mt_rand(6,10),
            'products_type_id2'=>mt_rand(15,20),
            //
        ];
    }
}