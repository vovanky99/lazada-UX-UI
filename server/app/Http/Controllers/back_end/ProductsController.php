<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Products;
use App\Models\ProductsType;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\select;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $shop = Shop::all();
        $cat =  Categories::all();
        $productsType = ProductsType::all();
        view()->share(compact('shop','cat','productsType'));
        $this->middleware('auth');
    }
    public function index()
    {
        $products = Products::paginate(30);
        $count_products = Products::count();
        return view('products/index',compact('count_products','products'));
    }

    public function search(Request $request){
        if($request->search_cat>0 && !empty($request->search_shop)){
            $products = Products::join('shop','shop.id','=','products.shop_id')->where('products.categories_id','=',$request->search_cat)
            ->where('products.title','like','%'.$request->search.'%')
            ->where('shop.name','like','%'.$request->search_shop.'%');
            
        }
        elseif($request->search_cat>0){
            $products = Products::where('products.title','like','%'.$request->search.'%')->where('products.categories_id','=',$request->search_cat);
            
        }
        elseif(!empty($request->search_shop)){
            $products = Products::join('shop','shop.id','=','products.shop_id')
            ->where('products.title','like','%'.$request->search.'%')
            ->where('shop.name','like','%'.$request->search_shop.'%');

        }
        elseif(!empty($request->search)){
            $products = Products::where('title','like','%'.$request->search.'%');
        }
        else{
            return redirect()->route('products.index');
        }
        $count_products = $products->count();
        $products = $products->paginate(30);
        $selected_cat = $request->search_cat;
        $selected_shop = $request->search_shop;
        $selected_search = $request->search;
        return view('products/index',compact('count_products','products','selected_cat','selected_shop','selected_search'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        
        return view('products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $pd = new Products;
        $getImages = '';
        if($request->hasFile('new_images')){
            $this->validate($request,[
                'new_images' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_images.mimes' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_images.max'=>`avatar can't limit 9MB `,
            ]);
            $images = $request->new_images;
            $getImages = $images->getClientOriginalName();
            $despathImages = public_path('upload/images/products');
            $images->move($despathImages,$getImages);
        }
        $pd->create([
            'title'=>$request->title,
            'images'=>$getImages,
            'price'=>$request->price,
            'discount'=>$request->discount,
            'quantities'=>$request->quantities,
            'status'=>$request->status,
            'descriptions'=>$request->descriptions,
            'categories_id'=>$request->categories_id,
            'shop_id'=>$request->shop_id,
            'products_type_id'=>$request->products_type,
            'products_type_id1'=>$request->products_type1,
            'products_type_id2'=>$request->products_type2,
        ]);
        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $pd = Products::find($id);
        return view('products/show',compact('pd'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $products = Products::find($id);
        return view('products/show',compact('products'));
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
        Products::find($id)->delete();
        return redirect()->route('products.index');
    }
    public function delete_multiple(Request $request){
        $ids = $request->ids;
        Products::whereIn('id',explode(",",$ids))->delete();
        return response()->json(['status'=>true,'message'=>"products deleted successfully."]);
    }
}