<?php 
namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Languages;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller {
   public function index(Request $request){
    try{
        
    }
    catch(Exception $e){
        return response()->json($e);
    }
   }
    public function getCat(Request $request){
        $search = $request->get('search');
        
        $language = Auth::user()->language;
        /* check language in db and return lang */
        if(!$language){
            $language = Languages::where('acronym','en')->first();
        }

        try{
            // $cat = DB::table('categories')->join('categories_translation as cat_trans','cat_trans.category_id','=','categories.id')->join('languages','cat_trans.language_id','=','languages.id')->leftJoin('categories as cat_parent','cat_parent.id','=','categories.parent_id')->where('cat_trans.name','like',$search.'%')->select('categories.*','cat_parent.id as parent_id',DB::raw("(select categories_translation.name from categories_translation where cat_parent.id = categories_translation.category_id and language_id = $lang->id ) as parent_name"),DB::raw("(select count(cat.id) from categories as cat where cat.parent_id =categories.id ) as children"),'cat_trans.name as name')->where([['cat_trans.language_id',$lang->id],['categories.status',1]]);
            $cat =  Categories::with([
                'categories_translation' => function($query) use ($language, $search) {
                    $query->select('category_id', 'name')
                          ->where('name', 'like', '%'.$search.'%')
                          ->where('language_id', $language->id);
                },'children_recursives'
            ])->where('categories.parent_id',);
            $cats = $cat->get();
            return response()->json(['cats'=>$cats]);
        }
        catch(Exception $e){
            return response()->json($e);
        }
   }
}