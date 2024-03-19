<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller {
    
    public function getSearchSuggest(Request $request){
        $title  = $request->get('q');
        $pd = DB::table('products')->where('title','LIKE',$title.'%')->orderByRaw('LENGTH(title) ASC')->limit(10)->get();
        return response()->json($pd,200);
    }
    public function getSearchAll(Request $request){
        $title  = $request->get('q');
        $order = $request->get('order');
        
        $pd1 = Products::leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->groupBy('products.id')->where('products.title','LIKE',$title.'%');
        if($order == ''){
            $pd = Products::rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where('products.title','LIKE',$title.'%')->union($pd1)->groupBy('products.id')->get();
        }
        else{
            $pd = Products::rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where('products.title','LIKE',$title.'%')->union($pd1)->groupBy('products.id')->orderBy('price',$order)->get();
        }
        
        return response()->json($pd,200);
    }
}