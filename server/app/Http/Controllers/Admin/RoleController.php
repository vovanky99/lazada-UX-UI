<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Http\Requests\RoleRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $role = Role::all();
        return response()->json($role);
    }
    public function getRole(Request $request){
        $q = $request->get('name');
        if($q){
            $role = Role::where('name','like',$q.'%')->get();
        }
        else{
            $role = Role::all();
        }
        return response()->json($role);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(RoleRequest $request)
    {
        //
        $dt = new Role;
        $dt->create($request->all());
        return redirect()->route('dt.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $role = Role::find($id);
        return view('role/edit',compact('role'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $dt = Role::find($id);
        //validator
        $dt->update($request->all());
        return redirect()->route('voucher.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Role::find($id)->delete();
        return redirect()->route('dt.index');
    }
}