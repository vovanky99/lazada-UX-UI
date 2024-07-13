<?php 
namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use CyrildeWit\EloquentViewable\Support\Period;
use Exception;
use Illuminate\Http\Request;

class ProductsController extends Controller {
   public function index(Request $request){
    try{
        
    }
    catch(Exception $e){
        return response()->json($e);
    }
   }
}