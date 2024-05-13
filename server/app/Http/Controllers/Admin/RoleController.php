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
    public function __construct()
    {
        return $this->middleware('auth');
    }
    public function index()
    {
        //
        $role = Role::paginate(15);
        $count_role = Role::count();
        return view('role/index',compact('role','count_role'));
    }

    public function search(Request $request){
        $role = Role::where('name','like','%'.$request->search.'%');
        $count_role = $role->count();
        $role = $role->paginate(15);
        return view('role/index',compact('role','count_role'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('role/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        //
        $dt = new Role;
        $dt->create($request->all());
        return redirect()->route('dt.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $role = Role::find($id);
        return view('role/show',compact('role'));
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