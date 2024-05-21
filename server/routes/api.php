<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Auth\Client\AuthController as LifeShopController;
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


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [LifeShopController::class,'logout']);
    // get user client
    Route::get('/user',[LifeShopController::class,'getUser']);

    //get admin 
    Route::get('/admin',[AdminAuthController::class,'getAmin']);

});

/* life shop */
Route::prefix('')->group(function(){
    /*auth */
    Route::post('/login', [LifeShopController::class,'login']);
    Route::post('/register', [LifeShopController::class,'register']);
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
});

/* admin life circe */
Route::prefix('/admin')->group(function(){
    // auth
    Route::post('/admin-login', [AdminAuthController::class,'login']);

    Route::middleware('auth:sanctum')->group(function(){
    //admin controller
    Route::controller(AdminController::class)->group(function(){
        Route::post('/update','store');
        Route::get('/get-search-location','getSearchLocation');
    });
    });
});

/* location */
Route::controller(LocationController::class)->group(function(){
    Route::get('/get-country','getCountry');
    Route::get('/get-city','getCity');
    Route::get('/get-district','getDistrict');
    Route::get('/get-ward','getWard');
    Route::get('/all-location','getLocation');
    Route::post('/create-country','createCountry');
    Route::post('/create-city','createCity');
    Route::post('/create-district','createDistrict');
    Route::post('/create-ward','createWard');
    Route::delete('/delete-location/{type}/{id}','deleteLocation');
    Route::delete('/delete-country/{id}','deleteCountry');
    Route::delete('/delete-city/{id}','deleteCity');
    Route::delete('/delete-district/{id}','deleteDistrict');
    Route::delete('/delete-ward/{id}','deleteWard');
    Route::patch('/edit-country/{id}','editCountry');
    Route::patch('/edit-city/{id}','editCity');
    Route::patch('/edit-district/{id}','editDistrict');
    Route::patch('/edit-ward/{id}','editWard');

});