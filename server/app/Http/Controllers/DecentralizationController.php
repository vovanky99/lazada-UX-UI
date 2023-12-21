<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Decentralization;

class DecentralizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        // $this->middleware('auth');
        // $this->middleware('log')->only('index');
        // $this->middleware('subscribed')->except('store');
    
    }
    public function index()
    {
        //
        $decentralization = Decentralization::paginate(15);
        return view('decentralization/index',compact('decentralization'));
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
    public function store(Request $request)
    {
        //
        $dt = new Decentralization;

        //validator
        $validateData = $request->validate([
            'name'=>'bail|required|min:8|max:30',
            'description'=>'bail|required|min:25|max:200'
        ]);
        $dt->name = $request->name;
        $dt->description = $request->description;
        $dt->save();
        $decentralization = Decentralization::paginate(15);
        return view('decentralization/index',compact('decentralization'));
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
        $validateData = $request->validate([
            'name'=>'bail|required|min:8|max:30',
            'description'=>'bail|required|min:25|max:200'
        ]);
        $dt->name = $request->name;
        $dt->description = $request->description;
        $dt->save();
        $decentralization = Decentralization::paginate(15);
        return view('decentralization/index',compact('decentralization'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $dt = Decentralization::find($id);
        $dt->delete();
        $decentralization = Decentralization::paginate(15);
        return view('decentralization/index',compact('decentralization'));
    }
}