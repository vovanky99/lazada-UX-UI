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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        /*cat seeder data*/
    
        $data =  array(
            array('id' => 1, 'title' => 'store', '_lft' => 1, '_rgt' => 20, 'parent_id' => null),
                array('id' => 2, 'title' => 'notebooks', '_lft' => 2, '_rgt' => 7, 'parent_id' => 1),
                    array('id' => 3, 'title' => 'apple', '_lft' => 3, '_rgt' => 4, 'parent_id' => 2),
                    array('id' => 4, 'title' => 'lenovo', '_lft' => 5, '_rgt' => 6, 'parent_id' => 2),
                array('id' => 5, 'title' => 'mobile', '_lft' => 8, '_rgt' => 19, 'parent_id' => 1),
                    array('id' => 6, 'title' => 'nokia', '_lft' => 9, '_rgt' => 10, 'parent_id' => 5),
                    array('id' => 7, 'title' => 'samsung', '_lft' => 11, '_rgt' => 14, 'parent_id' => 5),
                        array('id' => 8, 'title' => 'galaxy', '_lft' => 12, '_rgt' => 13, 'parent_id' => 7),
                    array('id' => 9, 'title' => 'sony', '_lft' => 15, '_rgt' => 16, 'parent_id' => 5),
                    array('id' => 10, 'title' => 'lenovo', '_lft' => 17, '_rgt' => 18, 'parent_id' => 5),
            array('id' => 11, 'title' => 'store_2', '_lft' => 21, '_rgt' => 22, 'parent_id' => null),
        );
        DB::table('categories')->insert($data);
        Decentralization::factory()->count(100)->create();
        $users = array(
            array('name'=>'maihoangha','username'=>'maihoangha','email'=>'maihoangha','password'=>Hash::make('123456789'),'phone_number'=>'0123456789','avatar'=>'dasde','level'=>1,'status'=>'1','gender'=>1,'birthday'=>'','address'=>'','decentralization_id'=>1),
        );
        DB::table('users')->insert($users);
        
        /*seeder factory */
       
        // Categories::factory()->count(100)->create();
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