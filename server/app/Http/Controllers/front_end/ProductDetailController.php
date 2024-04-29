<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Images;
use App\Models\Country;
use App\Models\District;
use App\Models\Products;
use App\Models\ProductType;
use App\Models\ProductTypeDetail;
use App\Models\ReportsProduct;
use App\Models\Reviews;
use App\Models\Shop;
use App\Models\TitleReports;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductDetailController extends Controller {
    
    public function getProductDetail(Request $request){
        $id = $request->get('id');

        /*get product */
        $Product = Products::where('products.id',$id)->select('products.*',Db::raw('(select count(reviews.id) from reviews where reviews.product_id = products.id) as total_reviews'),DB::raw('(select avg(reviews.review_star) from reviews where reviews.product_id = products.id) as score'),db::raw('(select sum(order_product.quantity) from order_product where order_product.product_id = products.id) as sold'),'discount.number as discount')->join('discount','discount.id','=','products.discount_id')->get();

        /*get reviews product */
        $reviews = Reviews::where('reviews.product_id',$id)->select('reviews.*','images.title','users.name','users.avatar')->join('images',function($join){
            $join->on('reviews.id','=','images.imageable_id')->where('images.imageable_type','=',Reviews::class);
        })->join('users','users.id','=','reviews.user_id')->groupBy('reviews.id')->get();

        /*get shop  product*/
        $shop = Shop::where('products.id',$id)->select('shop.*',DB::Raw('(select count(reviews.id) from reviews where reviews.product_id = products.id and products.shop_id = shop.id ) as total_reviews'),DB::raw('(select count(products.id) from products where products.shop_id = shop.id )as total_product'),db::raw('(select ((count(reviews.id))/(count(order_cart.id))*100) as res from products,reviews,order_product,order_cart where reviews.product_id = products.id and products.shop_id = shop.id and products.id = order_product.product_id and order_cart.id = order_product.order_id and order_cart.status >=2 and reviews.status<1 and reviews.status=1) as response_rate'),db::raw('(select round(SUM(TIMEDIFF(reviews.created_at,payment.payment_datetime))/count(reviews.id)) as l from
        products,reviews,payment,order_cart,order_product where reviews.product_id = products.id and products.shop_id = shop.id and products.id = order_product.product_id and order_cart.id = order_product.order_id and payment.id = order_cart.payment_id) as response_time'),db::raw('TIMEDIFF(LOCALTIME(), shop.created_at) as joined'),DB::raw('(select count(follow_shop.id) from follow_shop where follow_shop.shop_id = shop.id) as total_follow'))->join('products','products.shop_id','=','shop.id')->groupBy('shop.id')->get();
        
        /*get products from shop */
        foreach( $shop as $s ){
            $topShopPD = Products::where('shop.id',$s->id)->join('shop','products.shop_id','=','shop.id')->join('discount','discount.id','=','products.discount_id')->select('products.*','discount.number as discount')->groupBy('products.id')->orderBy(DB::raw('(select avg(reviews.review_star) from reviews,shop where products.id = reviews.product_id and shop.id = products.shop_id)','DESC'))->limit(5)->get();
            $pd = Products::where('id',$id)->get();
            foreach($pd as $p){
                $shopPD = Products::where('shop.id',$s->id)->join('categories','categories.id','=','products.category_id')->join('discount','discount.id','=','products.discount_id')->join('shop','products.shop_id','=','shop.id')->where('products.category_id',$p->category_id)->select('products.*','discount.number as discount',DB::raw('(select avg(reviews.review_star) from reviews where reviews.product_id = products.id) as score'))->groupBy('products.id')->limit(12)->get();

                $WillYouAlsoLike = Products::where('products.category_id',$p->category_id)->join('discount','discount.id','=','products.id')->select('products.*','discount.number as discount',DB::raw('(select avg(reviews.review_star) from reviews where reviews.product_id = products.id) as score'))->inRandomOrder()->limit(15)->get();
            }
            
        }
        /*get product type detail */
        $productType = ProductType::where('product_id',$id)->get();
        $PDdetail = [];
        foreach($productType as $pd){
           $productTypeDetail = ProductTypeDetail::where('product_type_id','=',$pd->id)->get();
           if(count($productTypeDetail) !=0){
               $PDdetail[$pd->title] = $productTypeDetail;
           }
        }
        /*get images for product */
        $images = Images::where('imageable_id',$id)->where('imageable_type',Products::class)->select('title')->limit(15)->get();
        /*get all report */
        $reportPD= TitleReports::all();
        
        return response()->json([
            'products'=>$Product,
            'reviews'=>$reviews,
            'shop'=>$shop,
            'top_products_shop'=>$topShopPD,
            'shop_products'=>$shopPD,
            'will_you_aslo_like'=>$WillYouAlsoLike,
            'images'=>$images,
            'product_type_details'=>$PDdetail,
            'reports'=>$reportPD,
        ]);
    }
    public function SendReports(Request $request){
        $title_id = $request->get('title_id');
        $content = $request->get('content');
        $product_id = $request->get('product_id');
        $id = $request->user()->id;
        ReportsProduct::create([
            'title_id'=>$title_id,
            'content'=>$content,
            'user_id'=>$id,
            'product_id'=>$product_id,
        ]);
        return response()->json(['sucess'=>'send success!'],200);
    }
    public function Location(Request $request){
        
    }
    public function getAddress(Request $request){
        $country = $request->get('country');
        $q = $request->get('q');
        $ad= [];
        $country = Country::where('name','like',$country)->first();
        if(!empty($country)){
            $city = City::where('country_id',$country->id)->where('name','like',$q.'%')->first();
            if(!empty($city)){
                $district = District::where('city_id',$city->id)->get();
                if(!empty($district)){
                    foreach($district as $d){
                        $ward = Ward::where('district_id',$d->id)->get();
                        if(!empty($ward)){
                            $ad[$ward->id] = $ward->name;
                        }
                    }
                }
            }
        }
            
        return response()->json(['result'=>$district],200);
    }
}