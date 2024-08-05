<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AttributesController;
use App\Http\Controllers\Admin\AttributesDetailsController;
use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\LogoController;
use App\Http\Controllers\Admin\ManufacturerController;
use App\Http\Controllers\Admin\PhoneResetController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ShippingMethodController;
use App\Http\Controllers\Admin\ShopController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\Admin\VoucherController;
use App\Http\Controllers\Auth\Client\AuthController as LifeShopController;
use App\Http\Controllers\Auth\Admin\AdminAuthController;
use App\Http\Controllers\Auth\Client\SocialAuthController;
use App\Http\Controllers\Auth\Seller\SellerAuthController;
use App\Http\Controllers\Auth\Seller\EmailVerifyController as SellerEmailVerifyController;
use App\Http\Controllers\CheckController;
use App\Http\Controllers\front_end\HomeController;
use App\Http\Controllers\front_end\SearchController;
use App\Http\Controllers\front_end\ProductDetailController;
use App\Http\Controllers\CloudinaryController;
use App\Http\Controllers\Seller\HomeController as SellerHomeController;
use App\Http\Controllers\Seller\ProfileController as SellerProfileController;
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

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [LifeShopController::class,'logout']);
    // get user client shop
    Route::get('/user',[LifeShopController::class,'getUser']);
    //get admin 
    Route::get('/admin',[AdminAuthController::class,'getAmin']);
    
    Route::get('/seller',[SellerAuthController::class,'getSeller']);
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

/* admin life circle */
Route::prefix('/admin')->group(function(){
    // auth
    Route::post('/admin-login', [AdminAuthController::class,'login']);
    Route::post('/password/phone-number', [PhoneResetController::class, 'requestReset']);
    Route::post('/password/reset-password', [PhoneResetController::class, 'resetPassword']);
    Route::middleware(['auth:sanctum'])->group(function(){
        //admin controller
        Route::controller(AdminController::class)->group(function(){ 
            Route::post('/update-profile','UpdateProfile');
            Route::post('/change-password','ChangePassword');
            Route::post('/create-admin','create');
            Route::get('/get-admin','getAllAdmin');
            Route::get('/show-admin/{id}','showAdmin');
            Route::patch('/edit-admin/{id}','editAdmin');
            Route::delete('/delete-admin','deleteAdmin');
        });
        // Role Controller
        Route::controller(RoleController::class)->group(function(){
            Route::get('/get-role','index');
            Route::post('/create-role','store');
            Route::get('/show-role/{id}','show');
            Route::patch('/edit-role/{id}','update');
            Route::delete('/delete-role/{id}','delete');
        });
        // Department Controller
        Route::controller(DepartmentController::class)->group(function(){
            Route::get('/get-department','getDepartment');
            Route::patch('/update-department','update');
            Route::delete('/delete-department','delete');
        });
        /* Category public */
        Route::controller(CategoriesController::class)->group(function(){
            Route::get('/get-category/{language}','index');
            Route::get('/catbar/{language}','catBar');
            Route::post('/create-category','store');
            Route::patch('/edit-category/{id}','update');
            Route::get('/show-category/{id}/{language}','show');
            Route::delete('/delete-category/{id}','delete');
            Route::get('/todo-list-cat','TodoListCat');
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
        Route::controller(UsersController::class)->group(function(){
            Route::get('/get-user','index');
            Route::post('/create-user','store');
            Route::get('/show-user/{id}','show');
            Route::patch('/edit-user/{id}','update');
            Route::delete('/delete-user/{id}','delete');
        });
        Route::controller(VoucherController::class)->group(function(){
            Route::get('/get-voucher','index');
            Route::post('/create-voucher','store');
            Route::get('/show-voucher/{id}','show');
            Route::patch('/edit-voucher/{id}','update');
            Route::delete('/delete-voucher/{id}','delete');
        });
        Route::controller(BlogsController::class)->group(function(){
            Route::get('/get-blogs','index');
            Route::post('/create-blogs','store');
            Route::get('/show-blogs/{id}','show');
            Route::patch('/edit-blogs/{id}','update');
            Route::delete('/delete-blogs/{id}','delete');
        });
        Route::controller(LogoController::class)->group(function(){
            Route::get('/get-logo','index');
            Route::get('/get-web-logo','getLogo');
            Route::post('/create-logo','store');
            Route::patch('/edit-logo/{id}','update');
            Route::delete('/delete-logo/{id}','delete');
        });
        Route::controller(ShopController::class)->group(function(){
            Route::get('/get-shop','index');
            Route::post('/create-shop','store');
            Route::get('/show-shop','show');
            Route::patch('/edit-shop/{id}','update');
            Route::delete('/delete-shop/{id}','delete');
        });
        Route::controller(ManufacturerController::class)->group(function(){
            Route::get('get-manu','index');
            Route::post('create-manu','store');
            Route::get('show-manu/{id}','show');
            Route::patch('edit-manu/{id}','update');
            Route::delete('delete-manu/{id}','delete');
        });
        Route::controller(AttributesController::class)->group(function(){
            Route::get('attrs-bar/{language}','getAttrsBar');
            Route::get('get-attribute/{language}','index');
            Route::post('create-attribute','store');
            Route::get('show-attribute/{id}/{language}','show');
            Route::patch('edit-attribute/{id]','update');
            Route::delete('delete-attribute/{id]','delete');
        });
        Route::controller(AttributesDetailsController::class)->group(function(){
            Route::get('get-attr-details/{language}','index');
            Route::post('create-attr-details','store');
            Route::get('show-attr-details/{id}/{language}','show');
            Route::patch('edit-attr-details/{id}','update');
            Route::delete('delete-attr-details/{id}','delete');
        });
    });
});


/* admin seller */
Route::prefix('/seller')->group(function () {
     /* seller verified email */
     Route::controller(SellerAuthController::class)->group(function(){
        Route::post('/login','login')->name('login');
        Route::post('/register','register');
        Route::post('/password/email','sendResetLinkEmail');
        Route::post('/password/reset','reset')->name('password.reset');
    });
    Route::get('/email/verify/{id}/{hash}',[SellerEmailVerifyController::class,'verify'])->name('seller.verification.verify');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/email/verification-notification',[SellerEmailVerifyController::class,'sendVerificationEmail']);   
        
    });
    Route::middleware(['auth:sanctum','verified'])->group(function () {  
        Route::controller(SellerProfileController::class)->group(function(){
            Route::post('/register-shop/{type}','RegisterShop');
        });
        Route::controller(SellerHomeController::class)->group(function(){
            Route::get('/home/todo-list','todoList');
            Route::get('/home/sales-analysis','salesAnalysis');
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
    Route::get('/show-location','showLocation');
});
Route::controller(CategoriesController::class)->group(function(){
    
});

/* check */
Route::controller(CheckController::class)->group(function(){
    Route::get('/check-username','CheckUsername');
    Route::get('/check-email','CheckEmail');
    Route::get('/check-phone','Checkphone');
});

/* get logo */
Route::controller(LogoController::class)->group(function(){
    Route::get('/get-web-logo','getLogo');
});

Route::controller(ShippingMethodController::class)->group(function(){
    Route::get('/get-shipping-method','index');
});

Route::controller(CloudinaryController::class)->group(function(){
    Route::post('/cloudinary','generateSignature');
    Route::post('/delete-image','deleteImage');
});

Route::controller(AdminController::class)->group(function(){
    Route::get('get-languages','languages');
});