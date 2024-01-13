<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ShopRequest;
use App\Models\Shop;
use App\Models\User;

class ShopController extends Controller
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
        $shop = Shop::paginate(15);
        $count_shop = Shop::count();
        $users = User::all();
        return view('shop/index',compact('shop','count_shop','users'));
    }
    public function search(Request $request){
        if($request->search_users>0){
            $shop = Shop::where('users_id','=',$request->search_users)->where('name','LIKE','%'.$request->search.'%');
            $count_shop = $shop->count();
            $shop = $shop->paginate(15);
        }
        else{
            $shop = Shop::where('name','LIKE','%'.$request->search.'%');
            $count_shop = $shop->count();
            $shop = $shop->paginate(15);
        }
        $selected_users = $request->search_users;
        $users = User::all();
        return view('shop/index',compact('shop','count_shop','users','selected_users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $users = User::all();
        return view('shop/create',compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShopRequest $request)
    {
        //
        $s = new Shop();
        //get logo
        $getlogo = '';
        if($request->hasFile('new_logo')){
            $this->validate($request,[
                'new_logo' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_logo.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_logo.max'=>`avatar can't limit 9MB `,
            ]);
            $logo = $request->new_logo;
            $getlogo=$logo->getClientOriginalName();
            $destinationPath = public_path('upload/images/shop/logo');
            $logo->move($destinationPath,$getlogo);
        }
        $getImgCover = '';
        if($request->hasFile('new_img_cover')){
            $this->validate($request,[
                'new_img_cover' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_img_cover.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_img_cover.max'=>`avatar can't limit 9MB `,
            ]);
            $img_cover = $request->new_img_cover;
            $getImgCover = $img_cover->getClientOriginalName();
            $destinationPath = public_path('upload/images/shop/img_cover');
            $img_cover->move($destinationPath,$getImgCover);
        }
        $s->name = $request->name;
        $s->logo = $getlogo;
        $s->img_cover = $getImgCover;
        $s->descriptions = $request->descriptions;
        $s->address = $request->address;
        $s->users_id = $request->owner;
        $s->save();
        $shop = Shop::paginate(15);
        $users = User::all();
        $count_shop = Shop::count();
        return view('shop/index',compact('shop','users','count_shop'))->with('success','created success');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $shop = Shop::find($id);
        return view('shop/show',compact('shop'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $users = User::all();
        $shop = Shop::find($id);
        return view('shop/edit',compact('shop','users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShopRequest $request, string $id)
    {
        //
        $s = Shop::find($id);

        $getlogo = '';
        if($request->hasFile('new_logo')){
            $this->validate($request,[
                'new_logo' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_logo.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_logo.max'=>`avatar can't limit 9MB `,
            ]);
            $logo = $request->new_logo;
            $getlogo=$logo->getClientOriginalName();
            $destinationPath = public_path('upload/images/shop/logo');
            $logo->move($destinationPath,$getlogo);
        }
        $getImgCover = '';
        if($request->hasFile('new_img_cover')){
            $this->validate($request,[
                'new_img_cover' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_img_cover.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_img_cover.max'=>`avatar can't limit 9MB `,
            ]);
            $img_cover = $request->new_img_cover;
            $getImgCover = $img_cover->getClientOriginalName();
            $destinationPath = public_path('upload/images/shop/img_cover');
            $img_cover->move($destinationPath,$getImgCover);
        }
        if($request->new_img_cover==''){
            $s->img_cover = $s->img_cover;
        }
        else{
            $s->img_cover = $getImgCover;
        }
        if($request->new_logo==''){
            $s->logo = $s->logo;
        }
        else{
            $s->logo= $getlogo;
        }
        $s->descriptions = $request->descriptions;
        $s->address = $request->address;
        $s->users_id = $request->owner;
        $s->save();
        $shop = Shop::paginate(15);
        $count_shop = Shop::count();
        $users = User::all();
        return view('shop/index',compact('count_shop','shop','users'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Shop::find($id)->delete();
        return redirect()->route('shop.index');
    }
}