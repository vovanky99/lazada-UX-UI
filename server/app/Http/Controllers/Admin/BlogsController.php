<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blogs;
use Illuminate\Support\Facades\DB;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $title = request()->get('title');
        $status = request()->get('status');
        $category_id = request()->get('category_id');
        $blogs = DB::table('blogs')->where('blogs.title','like','%'.$title.'%')->select('blogs.*','categories.name as cat_name')->leftJoin('categories','blogs.category_id','=','categories.id');
        if($status =='1' && $status =='0'){
            $blogs->where('blogs.status',$status);
        }
        // if($category_id){
        //     $blogs->whereIn('category_id',explode(',',$category_id));
        // }
        $blog = $blogs->get();
        return response()->json($blog);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $blogs = new Blogs;
        $blogs->create(request()->all());
        return response()->json(['success'=>'created success!']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blogs = DB::table('blogs')->where('blogs.id',$id)->select('blogs.*','categories.name as cat_name')->join('blogs','blogs.category_id','=','categories.id')->first();
        return response()->json($blogs);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( $id)
    {
        $blogs = Blogs::findOrFails($id);
        $blogs->update(request()->all());
        return response()->json(['success'=>'updated success!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id){
        Blogs::find($id)->delete();
        return response()->json(['status'=>"deleted success!"]);
    }
}