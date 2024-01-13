<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Products;
use App\Models\ProductsType;
use App\Models\Reviews;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\select;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
       return $this->middleware('auth');
    }
    public function index()
    {
        $sl = 'SELECT round(AVG(reviews.reviews_stars),1) FROM reviews where products.id=reviews.products_id group by products.id';
        $products = Products::join('categories','categories.id','=','products.categories_id')
        ->join('shop','shop.id','=','products.shop_id')
        ->select($sl,'products.*','categories.title as cat_title','shop.name as shop_name')->orderBy('products.id','asc');
       
        //paginate
        // $totalGroup = count($products);
        // $perPage = 15;
        // $page = Paginator::resolveCurrentPage('page'); 
        // $products = new LengthAwarePaginator($products->forPage($page,$perPage),$totalGroup,$perPage,$page,[
        //     'path' => Paginator::resolveCurrentPath(),
        //     'pageName' => 'page',
        // ]);
        //end paginate
        // $products = $products->paginate();
        $count_products = Products::count();
        $cat =  Categories::all();
        return view('products/index',compact('count_products','products','cat'));
    }

    public function search(Request $request){
        if(!empty($request->search_cat) && !empty($request->search_shop)){
            // $products = DB::select('call search_name_shop_in_products(?,?,?)',array($request->search_cat,$request->search_shop,$request->search));
            $products = Products::join('categories','categories.id','=','products.categories_id')
            ->join('shop','shop.id','=','products.shop_id')
            ->select('products.*','categories.title as cat_title','shop.name as shop_name')
            ->where('products.categories_id','=',$request->search_cat)
            ->where('products.title','like','%'.$request->search.'%')
            ->where('shop.name','like','%'.$request->search_shop.'%')->get();
            $count_products = $products->count();
            
        }
        elseif(!empty($request->search_cat)){
            $products = Products::join('categories','categories.id','=','products.categories_id')
            ->join('reviews','reviews.products_id','=','products.id')
            ->join('shop','shop.id','=','products.shop_id')
            ->select(DB::raw( 'ROUND(AVG( reviews.reviews_stars ),1) as reviews_stars' ),'products.*','categories.title as cat_title','shop.name as shop_name')->groupBy('products.id')->where('products.title','like','%'.$request->search.'%')->where('products.categories_id','=',$request->search_cat);
            $count_products = $products->count();
            
        }
        elseif(!empty($request->search_shop)){
            $products = Products::join('shop','shop.id','=','products.shop_id')
            ->join('categories','categories.id','=','products.categories_id')
            ->select('products.*','categories.title as cat_title','shop.name as shop_name')
            ->where('products.title','like','%'.$request->search.'%')
            ->where('shop.name','like','%'.$request->search_shop.'%')->get();
            $count_products = $products->count();
        }
        elseif(!empty($request->search)){
            $products = Products::where('title','like','%'.$request->search.'%');
            $count_products = $products->count();
            $products = $products->paginate(15);
        }
        else{
            $products = Products::join('categories','categories.id','=','products.categories_id')
            ->join('reviews','reviews.products_id','=','products.id')
            ->join('shop','shop.id','=','products.shop_id')
            ->select(DB::raw( 'ROUND(AVG( reviews.reviews_stars ),1) as reviews_stars' ),'products.*','categories.title as cat_title','shop.name as shop_name')->groupBy('products.id')->get();
            $count_products = Products::count();
        }
        //paginate
        $totalGroup = count($products);
        $perPage = 15;
        $page = Paginator::resolveCurrentPage('page'); 
        $products = new LengthAwarePaginator($products->forPage($page,$perPage),$totalGroup,$perPage,$page,[
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => 'page',
        ]);
        //end paginate
        
        $selected_cat = $request->search_cat;
        $selected_shop = $request->search_shop;
        $selected_search = $request->search;
        $cat =  Categories::all();
        return view('products/index',compact('count_products','products','cat','selected_cat','selected_shop','selected_search'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $shop = Shop::all();
        $cat =  Categories::all();
        $productsType = ProductsType::all();
        return view('products/create',compact('shop','cat','productsType'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}