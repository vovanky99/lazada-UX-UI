<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use App\Models\ProductsType;
use Illuminate\Http\Request;
use App\Http\Requests\ProductsTypeRequest;

class ProductsTypeController extends Controller
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
        $pd_type = ProductsType::paginate(15);
        $count_pd_type = ProductsType::count();
        return view('pd_type/index',compact('count_pd_type','pd_type'));
    }

    public function search(Request $request){
        $pd_type = ProductsType::where('title','like','%'.$request->search.'%');
        $count_pd_type = $pd_type->count();
        $pd_type = $pd_type->paginate(15);
        return view('pd_type/index',compact('count_pd_type','pd_type'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('pd_type/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductsTypeRequest $request)
    {
        //
        $pd_type1 = new ProductsType;
        $pd_type1->create($request->all());
        $pd_type = ProductsType::paginate(15);
        $count_pd_type = ProductsType::count();
        return view('pd_type/index',compact('count_pd_type','pd_type'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $pd_type = ProductsType::find($id);
        return view('pd_type/show',compact('pd_type'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $pd_type = ProductsType::find($id);
        return view('pd_type/edit',compact('pd_type'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductsTypeRequest $request, string $id)
    {
        //
        $pd_type1 = ProductsType::find($id);
        $pd_type1->update($request->all());
        $pd_type = ProductsType::paginate(15);
        $count_pd_type = ProductsType::count();
        return view('pd_type/index',compact('count_pd_type','pd_type'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        ProductsType::find($id)->delete();
        return redirect()->route('pd_type.index');
    }
}