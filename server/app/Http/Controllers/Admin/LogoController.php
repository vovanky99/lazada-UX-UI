<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Logo;

class LogoController extends Controller{
    public function index(){
        $logo = Logo::all();
        return response()->json($logo);
    }
    public function store(){
        Logo::create(
           request()->all()
        );
        return response()->json(['success'=>'created success!']);
    }
    public function update($id){
        Logo::find($id)->update(
            request()->all()
         );
         return response()->json(['success'=>'updated success!']);
    }
    public function delete($id){
        Logo::findOrFail($id)->delete();
         return response()->json(['success'=>'deleted success!']);
    }
    public function getLogo(){
        $type =request()->get('type');
        if($type){
            $logo = Logo::where('type',$type)->first();
            return response()->json($logo);
        }
        else{
            $logo = Logo::where('type','=','admin')->first();
            return response()->json($logo);
        }

    }
}