<?php 

namespace App\Http\Controllers\front_end;

use \App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller {
    
    public function getSearchSuggest(Request $request){
        $title  = $request->get('q');
        $pd = DB::table('products')->where('title','LIKE',$title.'%')->orderByRaw('LENGTH(title) ASC')->limit(10)->get();
        return response()->json($pd,200);
    }
    public function getSearchAll(Request $request){
        $title  = $request->get('q');
        $pd = DB::table('products')->where('title','LIKE',$title.'%')->orderByRaw('LENGTH(title) ASC')->get();
        return response()->json($pd,200);
    }
}