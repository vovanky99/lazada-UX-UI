<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UserController;
use \App\Http\Controllers\DecentralizationController;
use \App\Http\Controllers\CategoriesController;
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
});

/*route users */
Route::controller(UserController::class,)->group(function(){
    Route::GET('/users','index')->name('users.index');
    Route::GET('/users/create','create')->name('users.create');
    Route::POST('/users','store')->name('users.store');
    Route::GET('/users/{id}','show')->name('users.show');
    Route::GET('/users/{id}/edit','edit')->name('users.edit');
    Route::PATCH('/users/{id}','update')->name('users.update');
    Route::DELETE('/users/{id}','destroy')->name('users.destroy');
});

/*route decentralization or dt */
Route::controller( DecentralizationController::class)->group(function(){
    Route::GET('/dt','index')->name('dt.index');
    Route::GET('/dt/create','create')->name('dt.create');
    Route::POST('/dt','store')->name('dt.store');
    Route::GET('/dt/{id}','show')->name('dt.show');
    Route::GET('/dt/{id}/edit','edit')->name('dt.edit');
    Route::PATCH('/dt/{id}','update')->name('dt.update');
    Route::DELETE('/dt/{id}','destroy')->name('dt.destroy');
});

/*route decentralization or dt */
Route::controller( CategoriesController::class)->group(function(){
    Route::GET('/cat','index')->name('cat.index');
    Route::GET('/cat/create','create')->name('cat.create');
    Route::POST('/cat','store')->name('cat.store');
    Route::GET('/cat/{id}','show')->name('cat.show');
    Route::GET('/cat/{id}/edit','edit')->name('cat.edit');
    Route::PATCH('/cat/{id}','update')->name('cat.update');
    Route::DELETE('/cat/{id}','destroy')->name('cat.destroy');
});