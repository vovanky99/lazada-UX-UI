<?php 
namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\OrderCart;
use App\Models\OrderProduct;
use App\Models\Products;
use App\Models\Shop;
use Carbon\Carbon;
use CyrildeWit\EloquentViewable\Support\Period;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller {
   public function todoList(){
    try{
        $shop = Shop::where('seller_id',Auth::user()->id)->select(DB::raw('(select COUNT(order_cart.id) from products,orders_product,order_cart where products.shop_id = shop.id and orders_product.product_id = products.id and order_cart.id  = orders_product.order_id and order_cart.status = 1) as confirm '),DB::raw('(select COUNT(order_cart.id) from products,orders_product,order_cart where products.shop_id = shop.id and orders_product.product_id = products.id and order_cart.id  = orders_product.order_id and order_cart.status = 3) as seller_prepare_goods'),DB::raw('(select COUNT(order_cart.id) from products,orders_product,order_cart where products.shop_id = shop.id and orders_product.product_id = products.id and order_cart.id  = orders_product.order_id and order_cart.status = 4) as processed'),DB::raw('(select COUNT(order_cart.id) from products,orders_product,order_cart where products.shop_id = shop.id and orders_product.product_id = products.id and order_cart.id  = orders_product.order_id and order_cart.status = 5) as cancelled'),DB::raw('(select COUNT(order_cart.id) from products,orders_product,order_cart where products.shop_id = shop.id and orders_product.product_id = products.id and order_cart.id  = orders_product.order_id and order_cart.status = 6) as return_refund'),DB::raw('(select COUNT(order_cart.id) from products,orders_product,order_cart where products.shop_id = shop.id and orders_product.product_id = products.id and order_cart.id  = orders_product.order_id and order_cart.status = 9) as temporarily_locked'),DB::raw('(select COUNT(products.id) from products,orders_product,order_cart where products.shop_id = shop.id and products.quantity = 0) as products_is_out_of_stock'),DB::raw('(select COUNT(products.id) from products,orders_product,order_cart where products.shop_id = shop.id and products.status = 2) as locked_product'))->first();
        return response()->json($shop);
    }
    catch(Exception $e){
        return response()->json($e);
    }
   }
   public function salesAnalysis(){
        $shop = Shop::where('id',1)->first();
        $products = Products::where('shop_id',$shop->id);
        // $viewsShop = views($shop)->period(Period::create(Carbon::now()->toDateString()))->count();
        // $viewsProducts = views($products)->period(Period::create(Carbon::now()->toDateString()))->count();
        $totalOrderProducts = 0;
        foreach($products as $pd){
            $order = OrderProduct::where('product_id',$pd->id)->select(DB::raw("(select (products.price * if(products.discount_id = null,0,discount.number) ) as new_price from products,order where products.id = orders_product.product_id and orders_product.order_id = order.id and order.status = 2 and  order.updated_at="+Carbon::now()->toDateString()+" ) as total_price"))->get();
            $totalOrderProducts += $order->total_price;
        }
        return response()->json($totalOrderProducts);
   }
}