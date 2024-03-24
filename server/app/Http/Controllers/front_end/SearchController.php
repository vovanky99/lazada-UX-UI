<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Termwind\Components\Raw;

use function Laravel\Prompts\select;

class SearchController extends Controller {
    
    public function getSearchSuggest(Request $request){
        $title  = $request->get('q');
        $pd = DB::table('products')->where('title','LIKE',$title.'%')->orderByRaw('LENGTH(title) ASC')->limit(10)->get();
        return response()->json($pd,200);
    }
    public function getSearchAll(Request $request){
        $title  = $request->get('q');
        $order = $request->get('order');
        $cat = $request->get('cat');
        $priceTo = $request->get('to');
        $priceFrom = $request->get('from');
        $score = $request->get('score');
        //default price range
        if($priceTo ==''  && $priceFrom==''){
            $priceTo = 0;
            $priceFrom = 99999999;
        }
        // when you normall
        $pd1 = Products::leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->groupBy('products.id')->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%');
        // when you have category
        $category = Products::whereIn('products.categories_id',explode(",",$cat))->leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id');

        if($order !='' && $cat !='' && $score !=''){
            //when you have score with category
            $score2 = Products::whereIn('products.categories_id',explode(",",$cat))->leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_star','>=',$score);
            $pd = Products::whereIn('products.categories_id',explode(",",$cat))->rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where('products.title','LIKE',$title.'%')->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->union($score2)->groupBy('products.id')->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
         else if($order !='' && $cat !=''){
            $pd = Products::whereIn('products.categories_id',explode(",",$cat))->rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where('products.title','LIKE',$title.'%')->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->union($category)->groupBy('products.id')->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
        else if($order !='' && $score !=''){
            // when you have score
            $score1 = Products::leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_star','>=',$score);
            $pd = Products::whereIn('products.categories_id',explode(",",$cat))->leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->union($score1)->groupBy('products.id')->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
        else if($cat !='' && $score !=''){
            //when you have score with category
            $score2 = Products::whereIn('products.categories_id',explode(",",$cat))->leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_star','>=',$score);
            $pd = Products::whereIn('products.categories_id',explode(",",$cat))->rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where('products.title','LIKE',$title.'%')->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->union($score2)->groupBy('products.id')->get();
        }
        else if($cat !=''){
            $pd = Products::whereIn('products.categories_id',explode(",",$cat))->rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where('products.title','LIKE',$title.'%')->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->union($category)->groupBy('products.id')->get();
        }
        else if($order !=''){
            $pd = Products::rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->union($pd1)->groupBy('products.id')->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
        else if($score !=''){
            // when you have score
            $score1 = Products::leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_star','>=',$score);
            $pd = Products::whereIn('products.categories_id',explode(",",$cat))->leftJoin('reviews','reviews.products_id','=','products.id')->leftJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->union($score1)->groupBy('products.id')->get();
        }
        else{
            $pd = Products::rightJoin('reviews','reviews.products_id','=','products.id')->rightJoin('order_products','order_products.production_id','=','products.id')->select('products.*',DB::raw('SUM(order_products.quantity) as sold'),Db::raw('AVG(reviews.reviews_stars) as reviews_star'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->union($pd1)->groupBy('products.id')->get();
        }
        // $pd = Db::table('products')->select('products.*')->selectRaw('(price-(price*(discount/100))) as sell_price')
        // // ->where(DB::raw('price-(price*(discount/100))'),'>=',$priceTo)->where(DB::raw('price - (price *(discount/100))'),'<=',$priceFrom)
        // ->groupBy('products.id')->having('sell_price','>=',$priceTo)->get();
        return response()->json($pd,200);
    }
    public function getSearchCat(Request $request){
        $title  = $request->get('q');
        $d = DB::table('products')->rightJoin('categories','products.categories_id','=','categories.id')->select('categories.title as cat_title','categories.id as cat_id','products.title')->where('products.title','LIKE',$title.'%')->groupBy('cat_title')->limit(10)->get();
        return response()->json($d,200);
    }
}