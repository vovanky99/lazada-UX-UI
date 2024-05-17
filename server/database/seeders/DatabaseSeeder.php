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
        /*cat seeder data*/
        $users =array('name'=>'maihoangha','username'=>'maihoangha','email'=>'maihoangha@gmail.com','password'=>Hash::make('123456789'),'phone_number'=>'0123456789','avatar'=>'dasde','level'=>1,'status'=>'1','gender'=>1,'birthday'=>'');
        $role = array(array('name'=>'Employee','description'=>'Employee'),array('name'=>'Department Manager','description'=>'Department Manager'),array('name'=>'admin','description'=>'admin'));

        
        $admin = array('name'=>'admin','username'=>'admin','password'=>Hash::make('admin99'),'role_id'=>'3');

        DB::table('users')->insert($users);
        DB::table('role')->insert($role);
        DB::table('admin')->insert($admin);
        $titleReports = array(
            array('title'=>'Sản phẩm bị cấm buôn bán (động vật hoang dã, 18+,...)'),
            array('title'=>'Hàng giả, hàng nhái'),
            array('title'=>'Sản phẩm không rõ nguồn gốc, xuất xứ'),
            array('title'=>'Hình ảnh sản phẩm không rõ ràng'),
            array('title'=>'Sản phẩm có hình ảnh, nội dung phản cảm hoặc có thể gây phản cảm'),
            array('title'=>'Sản phẩm có dấu hiệu lừa đảo'),
            array('title'=>'Tên sản phẩm (Name) không phù hợp với hình ảnh sản phẩm'),
            array('title'=>'Sản phẩm có dấu hiệu tăng đơn ảo'),
            array('title'=>'Khác'),
        );
        DB::table('title_reports')->insert($titleReports);
    }
}