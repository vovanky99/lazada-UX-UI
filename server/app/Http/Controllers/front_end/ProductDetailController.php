<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductDetailController extends Controller {
    
    public function getProductDetail(Request $request){

        $id = $request->get('id');
        $Product = Products::where('products.id',$id)->select('products.*',Db::raw('(select count(reviews.id) from reviews where reviews.product_id = products.id) as total_reviews'),DB::raw('(select avg(reviews.review_star) from reviews where reviews.product_id = products.id) as score'),db::raw('(select sum(order_products.quantity) from order_products where order_products.product_id = products.id) as sold'))->get();
        return response()->json([
            'products'=>$Product,
            ''
        ]);
    }
}