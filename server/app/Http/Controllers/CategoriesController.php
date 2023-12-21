<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use Illuminate\Auth\Events\Validated;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categories::paginate(15);
        return view('categories/index',compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $cat = Categories::all();
        return view('categories/create',compact('cat'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validateData = $request->validate([
            'title' =>'bail|required|min:6|max:20',
        ]);
        if($request->id){
            $target = Categories::find($request->cat_id);
            if($target && $request->cat_id!=0){
                $node = new Categories([
                    'title' =>$request->title,
                    'parent_id' =>$request->cat_id,
                ]);
                $node->appendToNode($target)->save();
            }
        }
        else{
            $cat = Categories::create([
                'title' => $request->title,
            ]);
        }
        $categories = Categories::paginate(15);
        return view('categories/index',compact('categories'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}