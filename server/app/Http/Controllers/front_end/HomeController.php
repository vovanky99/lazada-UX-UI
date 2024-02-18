<?php

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Products;
use App\Models\Shop;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getCat()
    {
        //
        $cat = Categories::join('products','products.categories_id','=','categories.id')->where('categories.status','=','1')->select('categories.id','categories.title','products.images as images')->groupBy('categories.id')->offset(0)->take(16)->get();
        // $blog = Blogs::all();
        return response()->json($cat,200);
    }

    public function getMenu(){
        $menu = Categories::with('childrenRecursive')->whereNull('parent_id')->get();
        return response()->json($menu,200);
    }

    public function getShop()
    {
        //
        $shop = Shop::where('status','=','1')->offset(0)->take(6)->get();
        // $blog = Blogs::all();
        return response()->json($shop);
    }


    /**
     * Display the specified resource.
     */
    public function getProductsAll()
    {
        //
        $products = Products::join('reviews','reviews.products_id','=','products.id')->select(DB::raw('COUNT(reviews.id) as total_reviews'),DB::raw('AVG(reviews.reviews_stars) as reviews_stars'),'products.*')->groupBy('products.id')->get();
        return response()->json($products,200);
    }
    public function getflashSale(){
        $flashSale = Products::orderBy('discount','DESC')->offset(0)->take(6)->get();
        return response()->json($flashSale,200);
    }
   
}