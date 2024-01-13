<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Decentralization;
use App\Http\Requests\RoleRequest;

class DecentralizationController extends Controller
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
        $decentralization = Decentralization::paginate(15);
        $count_role = Decentralization::count();
        return view('decentralization/index',compact('decentralization','count_role'));
    }

    public function search(Request $request){
        $decentralization = Decentralization::where('name','like','%'.$request->search.'%');
        $count_role = $decentralization->count();
        $decentralization = $decentralization->paginate(15);
        return view('decentralization/index',compact('decentralization','count_role'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('decentralization/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request)
    {
        //
        $dt = new Decentralization;
        $dt->create($request->all());
        return redirect()->route('dt.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $decentralization = Decentralization::find($id);
        return view('decentralization/show',compact('decentralization'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $decentralization = Decentralization::find($id);
        return view('decentralization/edit',compact('decentralization'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $dt = Decentralization::find($id);
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
        Decentralization::find($id)->delete();
        return redirect()->route('dt.index');
    }
}