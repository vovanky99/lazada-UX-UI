<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attributes;
use App\Repositories\GeneralRepository;
use Exception;
use Illuminate\Http\Request;

class AttributesController extends Controller{

    public $general;
    public function __construct(GeneralRepository $general)
    {
        $this->general = $general;
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
        try{
            $attr = Attributes::find($id)->with('category.');
            return response()->json(['attribute'=>$attr]);
         }   
        catch(Exception$e){
            return response()->json($e);
        }
    }
    public function update(){

    }
}