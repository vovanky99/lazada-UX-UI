<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status'=>fake()->boolean(),
            'payment_datetime'=>fake()->dateTime(),
            'cod_id'=>mt_rand(1,100),
            'momo_id'=>mt_rand(1,100)
            //
        ];
    }
}