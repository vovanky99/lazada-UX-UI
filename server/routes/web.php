<?php

use App\Http\Controllers\back_end\BlogsController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\back_end\UsersController;
use \App\Http\Controllers\LoginController;
use \App\Http\Controllers\back_end\DecentralizationController;
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
})->middleware('auth');



/* route login */
Route::get('/login', function () {
    return view('login');
})->name('login');
Route::get('logintest',[LoginController::class,'getLogin'])->name('getlogin');
Route::get('/logout',[LoginController::class,'Logout'])->name('logout');

Route::GET('/404', function () {
    // abort(404);
    return view('404');
})->name('404');


/*route users */
Route::controller(UsersController::class)->group(function(){
    Route::GET('/users','index')->name('users.index');
    Route::GET('/users/create','create')->name('users.create');
    Route::POST('/users','store')->name('users.store');
    Route::GET('/users/{id}','show')->name('users.show');
    Route::GET('/users/{id}/edit','edit')->name('users.edit');
    Route::PATCH('/users/{id}','update')->name('users.update');
    Route::DELETE('/users/{id}','destroy')->name('users.destroy');
});

/*route decentralization or dt */
Route::controller(DecentralizationController::class)->group(function(){
    Route::GET('/dt','index')->name('dt.index');
    Route::GET('/dt/create','create')->name('dt.create');
    Route::POST('/dt','store')->name('dt.store');
    Route::GET('/dt/{id}','show')->name('dt.show');
    Route::GET('/dt/{id}/edit','edit')->name('dt.edit');
    Route::PATCH('/dt/{id}','update')->name('dt.update');
    Route::DELETE('/dt/{id}','destroy')->name('dt.destroy');
});

/*route decentralization or dt // role */
Route::controller(CategoriesController::class)->group(function(){
    Route::GET('/cat','index')->name('cat.index');
    Route::GET('/cat/create','create')->name('cat.create');
    Route::POST('/cat','store')->name('cat.store');
    Route::GET('/cat/{id}','show')->name('cat.show');
    Route::GET('/cat/{id}/edit','edit')->name('cat.edit');
    Route::PATCH('/cat/{id}','update')->name('cat.update');
    Route::DELETE('/cat/{id}','destroy')->name('cat.destroy');
});

/*route shop */
Route::controller(ShopController::class)->group(function(){
    Route::GET('/shop','index')->name('shop.index');
    Route::GET('/shop/create','create')->name('shop.create');
    Route::POST('/shop','store')->name('shop.store');
    Route::GET('/shop/{id}','show')->name('shop.show');
    Route::GET('/shop/{id}/edit','edit')->name('shop.edit');
    Route::PATCH('/shop/{id}','update')->name('shop.update');
    Route::DELETE('/shop/{id}','destroy')->name('shop.destroy');
});

/*mft */
Route::controller(ManufacturerController::class)->group(function(){
    Route::GET('/mft','index')->name('mft.index');
    Route::GET('/mft/create','create')->name('mft.create');
    Route::POST('/mft','store')->name('mft.store');
    Route::GET('/mft/{id}','show')->name('mft.show');
    Route::GET('/mft/{id}/edit','edit')->name('mft.edit');
    Route::PATCH('/mft/{id}','update')->name('mft.update');
    Route::DELETE('/mft/{id}','destroy')->name('mft.destroy');
});

/*pd_type */
Route::controller(ProductsTypeController::class)->group(function(){
    Route::GET('/pd_type','index')->name('pd_type.index');
    Route::GET('/pd_type/create','create')->name('pd_type.create');
    Route::POST('/pd_type','store')->name('pd_type.store');
    Route::GET('/pd_type/{id}','show')->name('pd_type.show');
    Route::GET('/pd_type/{id}/edit','edit')->name('pd_type.edit');
    Route::PATCH('/pd_type/{id}','update')->name('pd_type.update');
    Route::DELETE('/pd_type/{id}','destroy')->name('pd_type.destroy');
});

/*voucher */
Route::controller(VoucherController::class)->group(function(){
    Route::GET('/voucher','index')->name('voucher.index');
    Route::GET('/voucher/create','create')->name('voucher.create');
    Route::POST('/voucher','store')->name('voucher.store');
    Route::GET('/voucher/{id}','show')->name('voucher.show');
    Route::GET('/voucher/{id}/edit','edit')->name('voucher.edit');
    Route::PATCH('/voucher/{id}','update')->name('voucher.update');
    Route::DELETE('/voucher/{id}','destroy')->name('voucher.destroy');
});

/*blogs */

Route::controller(BlogsController::class)->group(function(){
    Route::GET('/blogs','index')->name('blogs.index');
    Route::GET('/blogs/create','create')->name('blogs.create');
    Route::POST('/blogs','store')->name('blogs.store');
    Route::GET('/blogs/{id}','show')->name('blogs.show');
    Route::GET('/blogs/{id}/edit','edit')->name('blogs.edit');
    Route::PATCH('/blogs/{id}','update')->name('blogs.update');
    Route::DELETE('/blogs/{id}','destroy')->name('blogs.destroy');
});

/*slide */
Route::controller(SlideController::class)->group(function(){
    Route::GET('/slide','index')->name('slide.index');
    Route::GET('/slide/create','create')->name('slide.create');
    Route::POST('/slide','store')->name('slide.store');
    Route::GET('/slide/{id}','show')->name('slide.show');
    Route::GET('/slide/{id}/edit','edit')->name('slide.edit');
    Route::PATCH('/slide/{id}','update')->name('slide.update');
    Route::DELETE('/slide/{id}','destroy')->name('slide.destroy');
});

/* payment */
Route::controller(PaymentController::class)->group(function(){
    Route::GET('/payment','index')->name('payment.index');
    Route::GET('/payment/create','create')->name('payment.create');
    Route::POST('/payment','store')->name('payment.store');
    Route::GET('/payment/{id}','show')->name('payment.show');
    Route::GET('/payment/{id}/edit','edit')->name('payment.edit');
    Route::PATCH('/payment/{id}','update')->name('payment.update');
    Route::DELETE('/payment/{id}','destroy')->name('payment.destroy');
});



/*products */
Route::controller(ProductsController::class)->group(function(){
    Route::GET('/products','index')->name('products.index');
    Route::GET('/products/create','create')->name('products.create');
    Route::POST('/products','store')->name('products.store');
    Route::GET('/products/{id}','show')->name('products.show');
    Route::GET('/products/{id}/edit','edit')->name('products.edit');
    Route::PATCH('/products/{id}','update')->name('products.update');
    Route::DELETE('/products/{id}','destroy')->name('products.destroy');
});

/*reviews */
Route::controller(ReviewsController::class)->group(function(){
    Route::GET('/reviews','index')->name('reviews.index');
    Route::GET('/reviews/create','create')->name('reviews.create');
    Route::POST('/reviews','store')->name('reviews.store');
    Route::GET('/reviews/{id}','show')->name('reviews.show');
    Route::GET('/reviews/{id}/edit','edit')->name('reviews.edit');
    Route::PATCH('/reviews/{id}','update')->name('reviews.update');
    Route::DELETE('/reviews/{id}','destroy')->name('reviews.destroy');
});

/* */
/* search */
Route::prefix('/search')->group(function(){
    ROUTE::GET('/cat',[CategoriesController::class,'search'])->name('cat.search');
    ROUTE::GET('/users',[UsersController::class,'search'])->name('users.search');
    ROUTE::GET('/dt',[DecentralizationController::class,'search'])->name('dt.search');
    ROUTE::GET('/shop',[ShopController::class,'search'])->name('shop.search');
    ROUTE::GET('/mft',[ManufacturerController::class,'search'])->name('mft.search');
    ROUTE::GET('/pd_type',[ProductsTypeController::class,'search'])->name('pd_type.search');
    ROUTE::GET('/voucher',[VoucherController::class,'search'])->name('voucher.search');
    ROUTE::GET('/blogs',[BlogsController::class,'search'])->name('blogs.search');
    ROUTE::GET('/slide',[SlideController::class,'search'])->name('slide.search');
    ROUTE::GET('/payment',[PaymentController::class,'search'])->name('payment.search');
    ROUTE::GET('/products',[ProductsController::class,'search'])->name('products.search');
    ROUTE::GET('/reviews',[ReviewsController::class,'search'])->name('reviews.search');
});