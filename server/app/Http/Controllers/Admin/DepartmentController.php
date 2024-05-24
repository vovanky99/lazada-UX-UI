<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;

class DepartmentController extends Controller{

    public function index(){
        $department = Department::all();
        return response()->json($department);
    }
}