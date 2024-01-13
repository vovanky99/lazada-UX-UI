<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogsRequest;
use App\Models\Blogs;
use App\Models\Categories;
use Illuminate\Http\Request;

class BlogsController extends Controller
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
        $blogs = Blogs::paginate(15);
        $count_blogs = Blogs::count();
        $cat = Categories::all();
        return view('blogs/index',compact('blogs','count_blogs','cat'));
    }

    public function search(Request $request){

        if($request->search_cat>0){
            $blogs = Blogs::where('title','like','%'.$request->search.'%')->where('categories_id','=',$request->search_cat);
            $count_blogs = $blogs->count();
            $blogs = $blogs->paginate(15);
        }
        else{
            $blogs = Blogs::where('title','like','%'.$request->search.'%');
            $count_blogs = $blogs->count();
            $blogs = $blogs->paginate(15);
        }
        $selected_cat = $request->search_cat;
        $cat = Categories::all();
        return view('blogs/index',compact('blogs','count_blogs','cat','selected_cat'));
   
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $cat = Categories::all();
        return view('blogs/create',compact('cat'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogsRequest $request)
    {
        //
        $blogs = new Blogs;
        $getImg = '';
        if($request->hasFile('new_img')){
            $this->validate($request,[
                'new_img' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_img.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_img.max'=>`avatar can't limit 9MB `,
            ]);
            $img = $request->new_img;
            $getImg = $img->getClientOriginalName();
            $destinationPath = public_path('upload/images/blogs');
            $img->move($destinationPath,$getImg);
        }

        $blogs->create([
            'title'=>$request->title,
            'descriptions'=>$request->descriptions,
            'content'=>$request->content,
            'status'=>$request->status,
            'img'=>$getImg,
            'categories_id'=>$request->categories_id
        ]);
        return redirect()->route('blogs.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $blogs = Blogs::find($id);
        return view('blogs/show',compact('blogs'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $cat = Categories::all();
        $blogs = Blogs::find($id);
        return view('blogs/edit',compact('blogs','cat'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogsRequest $request, string $id)
    {
        //
        $blogs = Blogs::find($id);
        $getImg = '';
        if($request->hasFile('new_img')){
            $this->validate($request,[
                'new_img' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_img.mimes' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_img.max'=>`avatar can't limit 9MB `,
            ]);
            $img = $request->new_img;
            $getImg = $img->getClientOriginalName();
            $destinationPath = public_path('upload/images/blogs');
            $img->move($destinationPath,$getImg);
        }
        if($request->new_img == ''){
            $getImg = $blogs->img;
        }
        $blogs->update([
            'title'=>$request->title,
            'descriptions'=>$request->descriptions,
            'content'=>$request->content,
            'status'=>$request->status,
            'img'=>$getImg,
            'categories_id'=>$request->categories_id
        ]);
        return redirect()->route('blogs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Blogs::find($id)->delete();
        return redirect()->route('blogs.index');
    }
}