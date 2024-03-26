<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Products;
use App\Models\Reviews;
use Illuminate\Database\Query\Builder;
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
        

        if($order !='' && $cat !='' && $score !=''){
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->whereIn('products.categories_id',explode(',',$cat))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_score','>=',$score)->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
         else if($order !='' && $cat !=''){
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->whereIn('products.categories_id',explode(',',$cat))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
        else if($order !='' && $score !=''){
            // when you have score
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_score','>=',$score)->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
        else if($cat !='' && $score !=''){
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->whereIn('products.categories_id',explode(',',$cat))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_score','>=',$score)->get();
        }
        else if($cat !=''){
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->whereIn('products.categories_id',explode(',',$cat))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->get();
        }
        else if($order !=''){
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->orderBy(DB::raw('(price-(price*(discount/100)))'),$order)->get();
        }
        else if($score !=''){
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->having('reviews_score','>=',$score)->get();
        }
        else{
            
            $pd = Products::select('products.*',DB::raw('(SELECT AVG(reviews.reviews_stars) from reviews where reviews.products_id = products.id) as reviews_score'),DB::raw('(SELECT SUM(quantity) from order_products where order_products.production_id = products.id) as sold'),DB::raw('(SELECT city.name from ward,district,city,shop where ward.district_id=district.id and district.city_id=city.id AND shop.ward_id=ward.id AND shop.id = products.shop_id ) as city_name'))->where(DB::raw('(price-(price*(discount/100)))'),'>=',$priceTo)->where(DB::raw('(price-(price*(discount/100)))'),'<=',$priceFrom)->where('products.title','LIKE',$title.'%')->groupBy('products.id')->get();
        }
        return response()->json($pd,200);
    }
    public function getSearchCat(Request $request){
        $title  = $request->get('q');
        $d = DB::table('products')->rightJoin('categories','products.categories_id','=','categories.id')->select('categories.title as cat_title','categories.id as cat_id','products.title')->where('products.title','LIKE',$title.'%')->groupBy('cat_title')->limit(10)->get();
        return response()->json($d,200);
    }
}