<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        $titleReports = array(
            array('name'=>'express','price'=>'20000'),
            array('name'=>'fats','price'=>'20000'),
            array('name'=>'saving','price'=>'20000'),
            array('name'=>'heavy_things','price'=>'20000')
        );
        DB::table('shipping_method')->insert($titleReports);
    }
}