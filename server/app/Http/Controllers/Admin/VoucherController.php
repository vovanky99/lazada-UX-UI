<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Voucher;
use App\Models\Categories;
use App\Models\ProductsType;
use App\Http\Requests\VoucherRequest;

class VoucherController extends Controller
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
        $voucher = Voucher::paginate(15);
        $count_voucher = Voucher::count();
        $cat = Categories::all();
        $pd_type = ProductsType::all();
        return view('voucher/index',compact('voucher','count_voucher','cat','pd_type'));
    }

    public function search(Request $request){
        if($request->search_cat>0 && $request->search_pd_type>0){
            $voucher = Voucher::where([['title','like','%'.$request->search.'%'],[
                'categories_id','=',$request->search_cat
            ],[
                'products_type_id','=',$request->search_pd_type
            ]]);
            $count_voucher = $voucher->count();
            $voucher = $voucher->paginate(15);
        }
        elseif($request->search_cat>0){
            
            $voucher = Voucher::where('title','like','%'.$request->search.'%')->where('categories_id','=',$request->search_cat);
            $count_voucher = $voucher->count();
            $voucher = $voucher->paginate(15);
        }
        elseif($request->search_pd_type>0){
            
            $voucher = Voucher::where('title','like','%'.$request->search.'%')->where('products_type_id','=',$request->search_pd_type);
            $count_voucher = $voucher->count();
            $voucher = $voucher->paginate(15);
        }
        else{
            $voucher = Voucher::where('title','like','%'.$request->search.'%');
            $count_voucher = $voucher->count();
            $voucher = $voucher->paginate(15);
        }
        $selected_pd_type = $request->search_pd_type;
        $selected_cat = $request->search_cat;
        $cat = Categories::all();
        $pd_type = ProductsType::all();
        return view('voucher/index',compact('voucher','count_voucher','cat','pd_type','selected_pd_type','selected_cat'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $cat = Categories::all();
        $pd_type = ProductsType::all();
        return view('voucher/create',compact('cat','pd_type'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VoucherRequest $request)
    {
        //
        $voucher1 = new Voucher;
        $voucher1->create($request->all());
        $voucher = Voucher::paginate(15);
        $count_voucher = Voucher::count();
        $cat = Categories::all();
        $pd_type = ProductsType::all();
        return view('voucher/index',compact('voucher','count_voucher','cat','pd_type'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $voucher = Voucher::find($id);
        return view('voucher/show',compact('voucher'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $voucher = Voucher::find($id);
        $cat = Categories::all();
        $pd_type = ProductsType::all();
        return view('voucher/edit',compact('voucher','cat','pd_type'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VoucherRequest $request, string $id)
    {
        //
        Voucher::find($id)->update($request->all());
        return redirect()->route('voucher.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Voucher::find($id)->delete();
        return redirect()->route('voucher.index');
    }
}