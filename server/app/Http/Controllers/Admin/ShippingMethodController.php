<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShippingMethod;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShippingMethodController extends Controller{
    public function index(Request $request){
        try{
            $shippingMethods = DB::table('shipping_method');
            $shippingMethod  = $shippingMethods->get();
            return response()->json($shippingMethod);
        }
        catch(Exception $e){
            return response( )->json($e);
        }
    }
    public function store(Request $request){
        
    }
}