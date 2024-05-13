<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Manufacturer;
use Illuminate\Http\Request;
use App\Http\Requests\ManufRequest;

class ManufacturerController extends Controller
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
        $mft = Manufacturer::paginate(15);
        $count_mft = Manufacturer::count();
        return view('mft/index',compact('mft','count_mft'));
    }

    public function search(Request $request){
        $mft = Manufacturer::where('name','LIKE','%'.$request->search.'%');
        $count_mft = $mft->count();
        $mft =$mft->paginate(15);
        return view('mft/index',compact('count_mft','mft'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('mft/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ManufRequest $request)
    {
        //
        $mft1 = new Manufacturer();
        //get logo
        $getlogo = '';
        if($request->hasFile('new_logo')){
            $this->validate($request,[
                'new_logo'=>'mimes:jpg,jpeg,png,gif|max:10000'
            ],[
                'new_logo.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_logo.max'=>`avatar can't limit 9MB `,
            ]);
            $logo = $request->new_logo;
            $getlogo = $logo->getClientOriginalName();
            $destinationPath = public_path('upload/images/manuf');
            $logo->move($destinationPath,$getlogo);
        }
        $mft1->name = $request->name;
        $mft1->logo = $getlogo;
        $mft1->descriptions = $request->descriptions;
        $mft1->save();
        $mft = Manufacturer::paginate(15);
        $count_mft = Manufacturer::count();
        return view('mft/index',compact('mft','count_mft'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $mft = Manufacturer::find($id);
        return view('mft/show',compact('mft'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $mft = Manufacturer::find($id);
        return view('mft/edit',compact('mft'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ManufRequest $request, string $id)
    {
        //
        $mft1 = Manufacturer::find($id);
        //get logo
        $getlogo = '';
        if($request->hasFile('new_logo')){
            $this->validate($request,[
                'new_logo'=>'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_logo.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_logo.max'=>`avatar can't limit 9MB `,
            ]);
            $logo =$request->new_logo;
            $getlogo= $logo->getClientOriginalName();
            $destinationPath = public_path('upload/images/manuf');
            $logo->move($destinationPath,$getlogo);
        }
        if($request->new_logo == ''){
            $mft1->logo = $mft1->logo;
        }
        else{
            $mft1->logo = $getlogo;
        }
        $mft1->name = $request->name;
        $mft1->descriptions = $request->descriptions;
        $mft1->save();

        $mft = Manufacturer::paginate(15);
        $count_mft = Manufacturer::count();
        return view('mft/index',compact('mft','count_mft'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Manufacturer::find($id)->delete();
        return redirect()->route('mft.index');
    }
}