<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VoucherFactory extends Factory
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
            'descriptions'=>fake()->sentence(),
            'percents'=>mt_rand(1,100),
            'code'=>fake()->isbn13(),
            'quantity'=>mt_rand(1,1000),
            'categories_id'=>mt_rand(1,10),
            'products_type_id'=>mt_rand(1,10),
            'start_day'=>fake()->date(),
            'end_day'=>fake()->date(),
            //
        ];
    }
}
