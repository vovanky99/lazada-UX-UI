<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AttributesDetail;
use App\Repositories\GeneralRepository;
use Exception;
use Illuminate\Http\Request;

class AttributesDetailsController extends Controller{
    public $general;
    public function __construct(GeneralRepository $general)
    {
        $this->general = $general;
    }
    public function store(Request $request){
        $name_en = $request->name_en;
        $name_vi = $request->name_vi;
        $attr_id = $request->attr_id;
        $en = $this->general->languages('en');
        $vi = $this->general->languages('vi');
        try{
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

    private function AttributeDetail($id){
        return AttributesDetail::where('id',$id)->first();
    }
}