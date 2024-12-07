<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckShippingFeeController extends Controller{
    public function CheckFeeSellerProduct(Request $request){
        $weight = $request->get('weight');
        return response()->json();
    }
}