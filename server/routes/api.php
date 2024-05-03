<?php

use App\Http\Controllers\Auth\Client\AuthController;
use App\Http\Controllers\Auth\Admin\AdminAuthController;
use App\Http\Controllers\Auth\Client\SocialAuthController;
use App\Http\Controllers\front_end\HomeController;
use App\Http\Controllers\front_end\SearchController;
use App\Http\Controllers\front_end\ProductDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class,'logout']);
    // Route::get('/user',[AuthController::class,'getUser']);
    // Route::get('/admin',[AdminAuthController::class,'getAdmin']);
});
/*auth */
Route::post('/login', [AuthController::class,'login']);
Route::post('/register', [AuthController::class,'register']);
Route::post('/admin-login', [AdminAuthController::class,'login']);


/*social auth */
Route::get('/auth/{provider}', [SocialAuthController::class,'redirectToProvider']);
Route::get('/auth/{provider}/callback', [SocialAuthController::class,'handleProviderCallback']);
Route::get('/decrypt-cookie',[SocialAuthController::class,'decryptCookie']);


/*search auth */
Route::prefix('/search')->name('search.')->group(function(){
    Route::get('',[SearchController::class,'getSearchAll'])->name('result');
    Route::get('/getcat',[SearchController::class,'getSearchCat'])->name('searchcat');
    Route::get('/header',[SearchController::class,'getSearchSuggest'])->name('header');
});

/*products detail */
Route::prefix('/product-detail')->group(function(){
    Route::get('',[ProductDetailController::class,'getProductDetail']);
    Route::post('/reports-product',[ProductDetailController::class,'SendReports'])->middleware('auth:sanctum');
    Route::get('/location',[ProductDetailController::class,'location']);
    Route::get('/get-address',[ProductDetailController::class,'getAddress']);
});


/*home page */
Route::prefix('/posts')->name('posts.')->group(function () {
    Route::get('/products',[HomeController::class,'getProductsAll'])->name('get_products'); 
    Route::get('/shop',[HomeController::class,'getShop'])->name('get_shop'); 
    Route::get('/cat',[HomeController::class,'getCat'])->name('get_cat'); 
    Route::get('/flashsale',[HomeController::class,'getflashSale'])->name('get_flashsale'); 
    Route::get('/menu',[HomeController::class,'getMenu'])->name('get_menu'); 
});