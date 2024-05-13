<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Slide;
use Illuminate\Http\Request;

class SlideController extends Controller
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
        $slide = Slide::paginate(15);
        $count_slide = Slide::count();
        $cat = Categories::all();
        return view('slide/index',compact('slide','count_slide','cat'));
    }
    public function search(Request $request){
        if($request->search_cat>0 && !empty($request->start_day) && !empty($request->end_day)){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('categories_id','=',$request->search_cat)->where('start_day','>=',$request->start_day)->where('end_day','<=',$request->end_day);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        elseif($request->start_day!='' && $request->end_day!=''){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('start_day','>=',$request->start_day)->where('end_day','<=',$request->end_day);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        elseif($request->search_cat>0 && !empty($request->start_day)){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('categories_id','=',$request->search_cat)->where('start_day','>=',$request->start_day);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        elseif($request->search_cat>0 && !empty($request->end_day)){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('categories_id','=',$request->search_cat)->where('end_day','<=',$request->end_day);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        elseif($request->search_cat>0){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('categories_id','=',$request->search_cat);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        elseif(!empty($request->start_day)){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('start_day','>=',$request->start_day);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        elseif(!empty($request->end_day)){
            $slide = Slide::where('title','like','%'.$request->search.'%')->where('end_day','<=',$request->end_day);
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        else{
            $slide = Slide::where('title','like','%'.$request->search.'%');
            $count_slide = $slide->count();
            $slide= $slide->paginate(15);
        }
        $value_start_day = $request->start_day;
        $value_end_day = $request->end_day;
        $selected_cat = $request->search_cat;
        $cat = Categories::all();
        return view('slide/index',compact('slide','count_slide','selected_cat','cat','value_start_day','value_end_day'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $cat= Categories::all();
        return view('slide/create',compact('cat'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $slide = new Slide;

        $getImg = '';
        if($request->hasFile('new_img')){
            $this->validate($request,[
                'new_img'=>'mimes:jpg,jpeg,png,gif|max:10000'
            ],[
                'new_avatar.mimes' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_avatar.max'=>`avatar can't limit 9MB `,
            ]);
            $img = $request->new_img;
            $getImg = $img->getClientOriginalName();
            $destinationPath = public_path('upload/images/slide');
            $img->move($destinationPath,$getImg);
        }

        $slide->create([
            'title'=>$request->title,
            'descriptions'=>$request->descriptions,
            'img'=>$getImg,
            'categories_id'=>$request->categories_id,
            'start_day'=>$request->start_day,
            'end_day'=>$request->end_day,
        ]);
        return redirect()->route('slide.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $slide = Slide::find($id);
        return view('slide/show',compact('slide'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $slide = Slide::find($id);
        $cat = Categories::all();
        return view('slide/edit',compact('slide','cat'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $slide = Slide::find($id);

        $getImg = '';
        if($request->hasFile('new_img')){
            $this->validate($request,[
                'new_img'=>'mimes:jpg,jpeg,png,gif|max:10000'
            ],[
                'new_avatar.mimes' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_avatar.max'=>`avatar can't limit 9MB `,
            ]);
            $img = $request->new_img;
            $getImg = $img->getClientOriginalName();
            $destinationPath = public_path('upload/images/slide');
            $img->move($destinationPath,$getImg);
        }
        if($request->new_img == ''){
            $getImg = $slide->img;
        }
        $slide->update([
            'title'=>$request->title,
            'descriptions'=>$request->descriptions,
            'img'=>$getImg,
            'categories_id'=>$request->categories_id,
            'start_day'=>$request->start_day,
            'end_day'=>$request->end_day,
        ]);
        return redirect()->route('slide.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Slide::find($id)->delete();
        return redirect()->route('slide.index');
    }
}