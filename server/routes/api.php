<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Auth\Client\AuthController as LifeShopController;
use App\Http\Controllers\Auth\Admin\AdminAuthController;
use App\Http\Controllers\Auth\Client\SocialAuthController;
use App\Http\Controllers\CheckController;
use App\Http\Controllers\front_end\HomeController;
use App\Http\Controllers\front_end\SearchController;
use App\Http\Controllers\front_end\ProductDetailController;
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

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [LifeShopController::class,'logout']);
    // get user client shop
    Route::get('/user',[LifeShopController::class,'getUser']);
    //get admin 
    Route::get('/admin',[AdminAuthController::class,'getAmin']);
});

/* life shop */
Route::prefix('')->group(function(){
    //auth
    Route::post('/login', [LifeShopController::class,'login']);
    Route::post('/register', [LifeShopController::class,'register']);
    // social auth 
    Route::get('/auth/{provider}', [SocialAuthController::class,'redirectToProvider']);
    Route::get('/auth/{provider}/callback', [SocialAuthController::class,'handleProviderCallback']);
    Route::get('/decrypt-cookie',[SocialAuthController::class,'decryptCookie']);

    //search auth 
    Route::prefix('/search')->name('search.')->group(function(){
        Route::get('',[SearchController::class,'getSearchAll'])->name('result');
        Route::get('/getcat',[SearchController::class,'getSearchCat'])->name('searchcat');
        Route::get('/header',[SearchController::class,'getSearchSuggest'])->name('header');
    });

    // products detail 
    Route::prefix('/product-detail')->group(function(){
        Route::get('',[ProductDetailController::class,'getProductDetail']);
        Route::post('/reports-product',[ProductDetailController::class,'SendReports'])->middleware('auth:sanctum');
        Route::get('/location',[ProductDetailController::class,'location']);
        Route::get('/get-address',[ProductDetailController::class,'getAddress']);
    });

    // home page
    Route::prefix('/posts')->group(function () {
        Route::get('/products',[HomeController::class,'getProductsAll']); 
        Route::get('/shop',[HomeController::class,'getShop']); 
        Route::get('/cat',[HomeController::class,'getCat']); 
        Route::get('/flashsale',[HomeController::class,'getflashSale']); 
        Route::get('/menu',[HomeController::class,'getMenu']); 
    });
});

/* admin life circe */
Route::prefix('/admin')->group(function(){
    // auth
    Route::post('/admin-login', [AdminAuthController::class,'login']);

    Route::middleware('auth:sanctum')->group(function(){
        //admin controller
        Route::controller(AdminController::class)->group(function(){ 
            Route::post('/update','update');
            Route::post('/create-admin','create');
            Route::get('/get-all-admin','getAllAdmin');
            Route::get('/show-admin/{id}','showAdmin');
            Route::patch('/edit-admin/{id}','editAdmin');
            Route::delete('/delete-admin','deleteAdmin');
        });
        // Role Controller
        Route::controller(RoleController::class)->group(function(){
            Route::get('/get-role','getRole');
        });
        // Department Controller
        Route::controller(DepartmentController::class)->group(function(){
            Route::get('/get-department','getDepartment');
        });
        /* Category public */
        Route::controller(CategoriesController::class)->group(function(){
            Route::post('/create-category','store');
            Route::patch('/edit-category/{id}','update');
            Route::delete('/delete-category/{id}','delete');
        });
        /* location */
        Route::controller(LocationController::class)->group(function(){
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
    });
});

/* location public*/
Route::controller(LocationController::class)->group(function(){
    Route::get('/all-location','index');
    Route::get('/get-country','getCountry');
    Route::get('/get-city','getCity');
    Route::get('/get-district','getDistrict');
    Route::get('/get-ward','getWard');
    Route::get('/get-search-location','getSearchLocation');
});

/* Category public */
Route::controller(CategoriesController::class)->group(function(){
    Route::get('/get-category','getCategory');
});

/* check user */
Route::controller(CheckController::class)->group(function(){
    Route::get('/check-username','CheckUsername');
});