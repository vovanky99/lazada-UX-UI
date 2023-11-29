<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Decentralization;
use \App\Models\User;
use \App\Models\Categories;
use \App\Models\Shop;
use \App\Models\ProductsType;
use \App\Models\Manufacturer;
use \App\Models\Slide;
use \App\Models\Voucher;
use \App\Models\PaymentMethod;
use \App\Models\Blogs;
use \App\Models\Products;
use \App\Models\Reviews;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        Decentralization::factory()->count(100)->create();
        Categories::factory()->count(100)->create();
        User::factory()->count(100)->create();
        Shop::factory()->count(100)->create();
        ProductsType::factory()->count(100)->create();
        Manufacturer::factory()->count(100)->create();
        Voucher::factory()->count(100)->create();
        Blogs::factory()->count(100)->create();
        Slide::factory()->count(100)->create();
        PaymentMethod::factory()->count(100)->create();
        Products::factory()->count(100)->create();
        Reviews::factory()->count(100)->create();

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
