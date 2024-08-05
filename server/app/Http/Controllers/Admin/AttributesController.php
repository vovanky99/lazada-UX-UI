<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attributes;
use App\Models\AttributesTranslation;
use App\Models\Languages;
use App\Repositories\GeneralRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttributesController extends Controller{

    public $general;
    public function __construct(GeneralRepository $general)
    {
        $this->general = $general;
    }
    public function index(Request $request,$language){
        $name = $request->get('name');
        $cat = $request->get('category_id');
        try{
            if($language){
                $lang = $this->general->languages($language);
            }
            else{
                $lang = $this->general->languages('en');
            }
            $attr = DB::table('attributes')->select('attributes.*',DB::raw("(select attributes_translation.name from attributes_translation where attributes_translation.attribute_id = attributes.id and attributes_translation.language_id = $lang->id and attributes_translation.name like '$name%' ) as attr_name"),DB::raw("(select categories_translation.name from categories_translation where categories_translation.category_id = attributes.cat_id and categories_translation.language_id = $lang->id ) as cat_name"));
            if($cat){
                $attr->where('cat_id',$cat);
            }
            $attrs = $attr->get();
            return response()->json($attrs);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    public function store (Request $request){
        $name_vi = $request->name_vi;
        $name_en = $request->name_en;
        $category = $request->category_id;
        $en = $this->general->languages('en');
        $vi = $this->general->languages('vi');
        try{
            $attr = Attributes::create([
                'cat_id'=>$category,
            ]);
            $attr->attribute_translation()->createMany([[
                'name'=>$name_vi,
                'language_id'=>$vi->id
            ],[
                'name'=>$name_en,
                'language_id'=>$en->id,
            ]]);
            return response()->json(['success'=>'create success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    public function show($id){
        // try{
        //     $attr = Attributes::find($id)->with(['category','attributes_translation']);
        //     return response()->json(['attribute'=>$attr]);
        //  }   
        // catch(Exception$e){
        //     return response()->json($e);
        // }
    }
    public function update(Request $request,$id){
        // $name_vi = $request->name_vi;
        // $name_en = $request->name_en;
        // $cat = $request->category_id;
        // $en = $this->general->languages('en');
        // $vi = $this->general->languages('vi');
        // try{
        //     $attr = $this->Attribute($id)->update([
        //         'cat_id'=>$cat,
        //     ]);

        //     $attr_tran = AttributesTranslation::where('attribute_id',$attr->id)->get();
        //     foreach($attr_tran as $a){
        //         if($a->language_id == $en->id){
        //             AttributesTranslation::where('id',$a->id)->first()->update([
        //                 'name'=>$name_en
        //             ]);
        //         }
        //         if($a->language_id == $vi->id){
        //             AttributesTranslation::where('id',$a->id)->first()->update([
        //                 'name'=>$name_vi
        //             ]);
        //         }
        //     }
        // }
        // catch(Exception $e){
        //     return response()->json($e);
        // }
    }
    public function delete($id){
        try{
            Attributes::find($id)->delete();
            return response()->json(['success'=>'delete success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    private function Attribute($id){
        return Attributes::where('id',$id)->first();
    }
}