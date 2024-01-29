<?php

use App\Http\Controllers\front_end\auth\AuthController;
use App\Http\Controllers\front_end\HomeControler;
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


Route::post('/login', [AuthController::class,'login']);
Route::post('/register', [AuthController::class,'register']); 

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class,'logout']);
});

Route::prefix('/posts')->name('posts.')->group(function () {
    Route::get('/products',[HomeControler::class,'getProductsAll'])->name('get_products'); 
    Route::get('/shop',[HomeControler::class,'getShop'])->name('get_shop'); 
    Route::get('/cat',[HomeControler::class,'getCat'])->name('get_cat'); 
    Route::get('/flashsale',[HomeControler::class,'getflashSale'])->name('get_flashsale'); 
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});