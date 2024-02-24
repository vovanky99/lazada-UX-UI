<?php

use App\Http\Controllers\front_end\auth\AuthController;
use App\Http\Controllers\front_end\HomeController;
use App\Http\Controllers\front_end\SearchController;
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
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function(Request $request){
        $request->user();
    });
    Route::post('/logout', [AuthController::class,'logout']);

});


Route::post('/login', [AuthController::class,'login']);
Route::post('/register', [AuthController::class,'register']); 

Route::prefix('/search')->name('search.')->group(function(){
    Route::get('',[SearchController::class,'getSearchAll'])->name('result');
    Route::get('/header',[SearchController::class,'getSearchSuggest'])->name('header');
});

Route::prefix('/posts')->name('posts.')->group(function () {
    Route::get('/products',[HomeController::class,'getProductsAll'])->name('get_products'); 
    Route::get('/shop',[HomeController::class,'getShop'])->name('get_shop'); 
    Route::get('/cat',[HomeController::class,'getCat'])->name('get_cat'); 
    Route::get('/flashsale',[HomeController::class,'getflashSale'])->name('get_flashsale'); 
    Route::get('/menu',[HomeController::class,'getMenu'])->name('get_menu'); 
});