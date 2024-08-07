<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AttributesDetail;
use App\Models\AttributesDetailTranslation;
use App\Repositories\GeneralRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttributesDetailsController extends Controller{
    public $general;
    public function __construct(GeneralRepository $general)
    {
        $this->general = $general;
    }
    public function index(Request $request,$language){
        $name = $request->get('name');
        $attr_id = $request->get('attr_id');
        if($language){
            $lang_id = $this->general->languages($language)->id;
        }
        else{
            $lang_id = $this->general->languages('en')->id;
        }
        try{
            $attr = DB::table('attributes_detail')->select('attributes_detail.id','attr_detail_tran.name as name',DB::raw("(select attributes_translation.name from  attributes_translation where attributes_translation.attribute_id = attributes_detail.attribute_id and language_id = $lang_id) as attribute_name"))->join('attributes_detail_translation as attr_detail_tran',function($join)use($lang_id,$name){
                $join->on('attributes_detail.id','=','attr_detail_tran.attribute_detail_id');
                $join->on('attr_detail_tran.language_id','=',DB::raw("$lang_id"));
                $join->on('attr_detail_tran.name','like',DB::raw("'$name%'"));
            });
            if($attr_id){
                $attr->where('attributes_detail.attribute_id',$attr_id);
            }
            
            $attrs = $attr->get();
            return response()->json(['attrs'=>$attrs]);

        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    public function store(Request $request){
        $name_en = $request->name_en;
        $name_vi = $request->name_vi;
        $attr_id = $request->attr_id;
        $en = $this->general->languages('en');
        $vi = $this->general->languages('vi');
        try{
            if(count(AttributesDetailTranslation::where('name',$name_en)->orWhere('name',$name_vi)->where('attribute_id',$attr_id)->get()) >0){
                return response()->json(['error'=>'attr is exist!']);
            }
            $attr = AttributesDetail::create([
                'attribute_id'=>$attr_id,
            ]);
            $attr->attributes_detail_translation()->createMany([[
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


    public function delete($id){
        try{
            AttributesDetail::find($id)->delete();
            return response()->json(['success'=>'delete success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    private function AttributeDetail($id){
        return AttributesDetail::where('id',$id)->first();
    }
}