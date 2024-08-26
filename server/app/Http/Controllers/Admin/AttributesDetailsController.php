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
            if(count(AttributesDetailTranslation::where('name',$name_en)->orWhere('name',$name_vi)->join('attributes_detail',function($join)use($attr_id){
                $join->on('attributes_detail.id','=','attributes_detail_translation.attribute_detail_id');
                $join->on('attributes_detail.attribute_id','=',DB::raw("$attr_id"));
            })->get()) >0){
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

    public function show($id,$language){
        try{
            if($language){
                $langId = $this->general->languages($language)->id;
            }
            else{
                $langId = $this->general->languages('en')->id;
            }
            $attr = AttributesDetail::where('id',$id)->with(['attributes_detail_translation','attribute'=>function($query)use($langId){
                $query->with(['attributes_translation'=>function($query) use($langId){
                    $query->where('language_id',$langId);
                }]);
            }])->first();    

            return response()->json(['attr'=>$attr]);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    public function update(Request $request,$id){
        $name_vi = $request->name_vi;
        $name_en = $request->name_en;
        $attribute_id = $request->attribute_id;
        $en = $this->general->languages('en');
        $vi = $this->general->languages('vi');
        try{
            $attr = $this->AttributeDetail($id)->update([
                'attribute_id'=>$attribute_id,
            ]);

            $attr_tran = AttributesDetailTranslation::where('attribute_detail_id',$attr->id)->get();
            foreach($attr_tran as $a){
                if($a->language_id == $en->id){
                    AttributesDetailTranslation::where('id',$a->id)->first()->update([
                        'name'=>$name_en
                    ]);
                }
                if($a->language_id == $vi->id){
                    AttributesDetailTranslation::where('id',$a->id)->first()->update([
                        'name'=>$name_vi
                    ]);
                }
            }
            return response()->json(['success'=>'update success!']);
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