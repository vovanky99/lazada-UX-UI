<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blogs;
use App\Models\Categories;
use App\Models\CategoryBlog;
use Exception;
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
        $blogs = Blogs::where('blogs.title','like','%'.$title.'%')->with('categories');
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
        $category_id = request()->category_id;
        $title= request()->title;
        $content= request()->content;
        $descriptions= request()->descriptions;
        $status= request()->status;
        $img = request()->img;
        try{
            $blogs = Blogs::create([
                'title'=>$title,
                'content'=>$content,
                'descriptions'=>$descriptions,
                'status'=>$status,
                'img'=>$img,
            ]);
            if(count($category_id)>0){
                foreach($category_id as $cat){
                    CategoryBlog::create([
                        'blog_id'=>$blogs->id,
                        'category_id'=>$cat,
                    ]);
                }
            }
            return response()->json(['success'=>'created success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
       
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blogs = Blogs::find($id)->with('categories')->first();
        return response()->json($blogs);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( $id)
    {
        $category_id = request()->category_id;
        $title= request()->title;
        $content= request()->content;
        $descriptions= request()->descriptions;
        $status= request()->status;
        $img = request()->img;
        $blogBFUp = Blogs::find($id)->with('categories')->first();
        try{
            $newCat = [];
            foreach($blogBFUp->categories as $bl){
                array_push($newCat,$bl->id);
                if(!in_array($bl->id,$category_id)){
                    CategoryBlog::where('id',$bl->id)->delete();
                }
            }

            foreach($category_id as $cat){
                if(!in_array($cat,$newCat)){
                    CategoryBlog::create([
                        'category_id'=>$cat,
                        'blog_id'=>$blogBFUp->id,
                    ]);
                }
            }
            $blogBFUp->update([
                'title'=>$title,
                'content'=>$content,
                'descriptions'=>$descriptions,
                'status'=>$status,
                'img'=>$img,
            ]);

            return response()->json(['success'=>'updated success!']);
        }
        catch(Exception $e){
            return response()->json($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id){
        Blogs::find($id)->delete();
        return response()->json(['status'=>"deleted success!"]);
    }
}