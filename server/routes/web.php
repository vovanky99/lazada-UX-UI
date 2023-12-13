<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UserController;
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
    return view('header');
});

Route::GET('/users',[UserController::class,'index'])->name('users.index');
Route::GET('/users/create',[UserController::class,'create'])->name('users.create');
Route::POST('/users',[UserController::class,'store'])->name('users.store');
Route::GET('/users/{id}',[UserController::class,'show'])->name('users.show');
Route::GET('/users/{id}/edit',[UserController::class,'edit'])->name('users.edit');
Route::PATCH('/users/{id}',[UserController::class,'update'])->name('users.update');