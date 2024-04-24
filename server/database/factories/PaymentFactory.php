<?php

namespace Database\Factories;

use App\Models\Cod;
use App\Models\Momo;
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
        $paymentable = $this->paymentable();
        return [
            'status'=>fake()->boolean(),
            'payment_datetime'=>fake()->dateTime(),
            'paymentable_id'=>mt_rand(1,100),
            'paymentable_type'=>$paymentable,
            //
        ];
    }
    public function paymentable(){
        return $this->faker->randomElement([
            Cod::class,
            Momo::class
        ]);
    }
}