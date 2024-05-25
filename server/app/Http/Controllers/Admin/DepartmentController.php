<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller{

    public function index(){
        $department = Department::all();
        return response()->json($department);
    }

    public function getDepartment(Request $request){
        $q = $request->get('name');
        if($q){
            $department = Department::where('name','like',$q.'%')->get();
        }
        else{
            $department = Department::all();
        }
        return response()->json($department);
    }
}