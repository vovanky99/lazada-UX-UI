<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Manufacturer;
use Exception;

class ManufacturerController extends Controller
{
    public function index()
    {
        $name = request()->name;
        $status = request()->status;
        try{
            $manu = Manufacturer::where('name','like',$name.'%');
            if($status =='1' || $status =="0"){
                $manu->where('status',$status);
            }
            $man = $manu->get();
            return response()->json($man);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    public function store()
    {
        try{
            Manufacturer::create(request()->all());
            return response()->json(['success'=>'created success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    public function show($id)
    {
        $manu = Manufacturer::find($id);
        return response()->json($manu);
    }

    public function update($id)
    {
        try{
            Manufacturer::findOrFail($id)->update(
            request()->all()
            );
            return response()->json(['success'=>'updated success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    public function destroy($id)
    {
       Manufacturer::findOrFail($id)->delete();
       return response()->json(['success'=>'deleted success!']);
    }
}