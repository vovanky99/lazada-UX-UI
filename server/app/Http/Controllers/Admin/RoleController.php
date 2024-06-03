<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Http\Requests\RoleRequest;
use Exception;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $q = request()->get('name');
        $role = Role::where('name','like',$q.'%')->whereNot('name','=','admin')->get();
        return response()->json($role);
    }
    
    public function store()
    {
        
        try{
            $checkName = Role::where('name',request()->name)->first();
            if($checkName){
                return response()->json(['error'=>'role already exists!']);
            }
            else{
                Role::create(
                    request()->all(),
                );
                return response()->json(['success'=>'created success!']);
            }

        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show($id)
    {
       $role = Role::find($id);
       return response()->json($role);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id)
    {
        try{
            Role::findOrFail($id)->update(
               request()->all()
            );
            return response()->json(['success'=>'updated success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        try{
            Role::findOrFail($id);
            return response()->json(['success'=>'deleted success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }
}