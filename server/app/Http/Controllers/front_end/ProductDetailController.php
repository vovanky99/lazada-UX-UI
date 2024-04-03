<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductDetailController extends Controller {
    
    public function getProductDetail(Request $request){

        $id = $request->get('id');
        $Product = Products::find($id)->select('products.*',DB::raw(`(select count(reviews.id) from reviews where reviews.product_id = $id and reviews.product_id) as total_review`));
        return response()->json($Product,200);
    }
}