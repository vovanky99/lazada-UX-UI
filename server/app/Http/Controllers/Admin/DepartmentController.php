<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Exception;
use Illuminate\Http\Request;

class DepartmentController extends Controller{

    public function index(){
        $department = Department::all();
        return response()->json($department);
    }

    public function getDepartment(Request $request){
        $q = $request->get('name');
        $department = Department::where('name','like',$q.'%')->get();
        return response()->json($department);
    }
    public function update($id){
       try{ 
        Department::find($id)->update([
            request()->all(),
        ]);
        return response()->json(['success'=>'updated success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
    public function delete($id){
        try{ 
            Department::find($id)->delete();
            return response()->json(['success'=>'deleted success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
}