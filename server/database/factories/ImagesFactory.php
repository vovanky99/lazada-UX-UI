<?php

namespace Database\Factories;

use App\Models\Products;
use App\Models\Reviews;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Images>
 */
class ImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageAble = $this->imageable();
        return [
            //
            'title'=>fake()->imageUrl(),
            'imageable_id'=>mt_rand(1,100),
            'imageable_type'=>$imageAble,
        ];

    }
    public function imageable(){
        return $this->faker->randomElement([
            Products::class,
            Reviews::class,
        ]);
    }
}