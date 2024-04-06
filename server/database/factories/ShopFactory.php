<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->name(),
            'logo'=>fake()->imageUrl(),
            'img_cover'=>fake()->imageUrl(),
            'status'=>fake()->boolean(),
            'descriptions'=>fake()->sentence(),
            'user_id'=>mt_rand(1,10),
            'street_address_id'=>mt_rand(1,20),
            'ward_id'=>mt_rand(1,30),
            //
        ];
    }
}