<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\Reviews;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Termwind\Components\Raw;

use function Laravel\Prompts\select;

class ProductDetailController extends Controller {
    
    public function getProductDetail(Request $request){

        $id = $request->get('id');
        $Product = Products::where('products.id',$id)->select('products.*',Db::raw('(select count(reviews.id) from reviews where reviews.product_id = products.id) as total_reviews'),DB::raw('(select avg(reviews.review_star) from reviews where reviews.product_id = products.id) as score'),db::raw('(select sum(order_products.quantity) from order_products where order_products.product_id = products.id) as sold'))->get();
        $reviews = Reviews::where('reviews.product_id',$id)->select('reviews.*','images_reviews.images')->join('images_reviews','images_reviews.review_id','=','reviews.id')->groupBy('reviews.id')->get();
        $shop = Shop::where('products.id',$id)->select('shop.*',DB::Raw('(select count(reviews.id) from reviews where reviews.product_id = products.id and products.shop_id = shop.id ) as total_reviews'),DB::raw('(select count(products.id) from products where products.shop_id = shop.id )as total_product'),db::raw('(select ((count(reviews.id))/(count(order_cart.id))*100) as res from products,reviews,order_products,order_cart where reviews.product_id = products.id and products.shop_id = shop.id and products.id = order_products.product_id and order_cart.id = order_products.order_id and order_cart.status >=2 and reviews.status<1 and reviews.status=1) as response_rate'),db::raw('(select round(SUM(TIMEDIFF(reviews.created_at,payment.payment_datetime))/count(reviews.id)) as l from
        products,reviews,payment,order_cart,order_products where reviews.product_id = products.id and products.shop_id = shop.id and products.id = order_products.product_id and order_cart.id = order_products.order_id and payment.id = order_cart.payment_id) as response_time'),db::raw('TIMEDIFF(LOCALTIME(), shop.created_at) as joined'),DB::raw('(select count(follow_shop.id) from follow_shop where follow_shop.shop_id = shop.id) as total_follow'))->join('products','products.shop_id','=','shop.id')->groupBy('shop.id')->get();
        
        foreach( $shop as $s ){
            $topShopPD = Products::where('shop.id',$s->id)->join('shop','products.shop_id','=','shop.id')->select('products.*')->groupBy('products.id')->orderBy(DB::raw('(select avg(reviews.review_star) from reviews,shop where products.id = reviews.product_id and shop.id = products.shop_id)','DESC'))->limit(5)->get();
            $pd = Products::where('id',$id)->get();
            foreach($pd as $p){
                $shopPD = Products::where('shop.id',$s->id)->join('categories','categories.id','=','products.category_id')->join('shop','products.shop_id','=','shop.id')->where('products.category_id',$p->category_id)->select('products.*')->groupBy('products.id')->get();
                $WillYouAlsoLike = Products::where('products.category_id',$p->category_id)->get();
            }
            
        }
        return response()->json([
            'products'=>$Product,
            'reviews'=>$reviews,
            'shop'=>$shop,
            'top_products_shop'=>$topShopPD,
            'shop_products'=>$shopPD,
            'will_you_aslo_like'=>$WillYouAlsoLike
        ]);
    }
}