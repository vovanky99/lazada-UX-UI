<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AddressUsersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'=>mt_rand(1,100),
            'home'=>fake()->boolean(),
            'ward_id'=>mt_rand(1,30),
            'street_address_id'=>mt_rand(1,30),
            //
        ];
    }
}