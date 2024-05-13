<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\Reviews;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $users = User::all();
        $this->middleware('auth');
        view()->share(compact('users'));
    }
    public function index()
    {
        //
        $reviews = Reviews::paginate(30);
        $count_reviews = Reviews::count();
        return view('reviews/index',compact('reviews','count_reviews'));
    }

    public function search(){
        
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        Reviews::find($id)->delete();
        return redirect()->route('reviews.index');
    }
    public function delete_multiple(Request $request){
        $ids = request('ids');
        Reviews::whereIn('id',explode(',',$ids))->delete();
        return response()->json(['status'=>true, 'message'=>'succes deleted reviews']);
    }
}