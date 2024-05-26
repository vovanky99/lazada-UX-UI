<?php

use App\Http\Controllers\back_end\BlogsController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\back_end\UsersController;
use \App\Http\Controllers\back_end\LoginController;
use \App\Http\Controllers\back_end\RoleController;
use \App\Http\Controllers\back_end\CategoriesController;
use \App\Http\Controllers\back_end\ShopController;
use \App\Http\Controllers\back_end\ManufacturerController;
use App\Http\Controllers\back_end\PaymentController;
use App\Http\Controllers\back_end\ProductsController;
use \App\Http\Controllers\back_end\ProductsTypeController;
use App\Http\Controllers\back_end\ReviewsController;
use App\Http\Controllers\back_end\SlideController;
use App\Http\Controllers\back_end\VoucherController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    return view('Home');
})->middleware('auth')->name('home');