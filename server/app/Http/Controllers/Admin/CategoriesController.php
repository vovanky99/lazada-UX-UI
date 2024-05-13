<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\catRequest;
use App\Models\Categories;

class CategoriesController extends Controller
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
        $categories = Categories::paginate(15);
        $count_cat = Categories::count();
        return view('categories/index',compact('categories','count_cat'));
    }

    public function search(Request $request){
        $categories = Categories::where('title','like','%'.$request->search.'%');
        $count_cat = $categories->count();
        $categories = $categories->paginate(15);
        return view('categories/index',compact('categories','count_cat'));
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
    public function store(catRequest $request)
    {
        //
        if($request->cat_id > 0){
            DB::select('CALL create_cat(?,?)',array($request->title,$request->cat_id));
        }
        else{
            // DB::select('EXEC create_cat_not_child ?',array($request->title));
            DB::select('CALL create_cat_not_child(?)',array($request->title));
        }
        $categories = Categories::paginate(15);
        $count_cat = Categories::count();
        return view('categories/index',compact('categories','count_cat'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $cat = Categories::find($id);
        return view('categories/show',compact('cat'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $cat = Categories::find($id);
        $cat_parent = Categories::all();
        return view('categories/edit',compact('cat','cat_parent'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(catRequest $request, string $id)
    {
        //
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        DB::select('call delete_cat(?)',array($id));
        return redirect()->route('cat.index');
    }
}