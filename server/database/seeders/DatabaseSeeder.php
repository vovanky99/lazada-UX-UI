<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use \App\Models\Role;
use \App\Models\User;
use \App\Models\Shop;
use \App\Models\Manufacturer;
use \App\Models\Slide;
use \App\Models\Voucher;
use \App\Models\Payment;
use \App\Models\Blogs;
use App\Models\City;
use \App\Models\Products;
use \App\Models\Reviews;
use \App\Models\Cod;
use App\Models\Discount;
use App\Models\District;
use App\Models\FollowShop;
use App\Models\Images;
use App\Models\Messages;
use App\Models\MessagesShop;
use App\Models\Momo;
use App\Models\Country;
use App\Models\OrderCart;
use App\Models\OrderProduct;
use App\Models\ProductType;
use App\Models\ProductTypeDetail;
use App\Models\StreetAddress;
use App\Models\Ward;
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

        DB::table('users')->insert($users);
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