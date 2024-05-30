<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VoucherController extends Controller
{
    public function index(){
        $name = request()->get('name');
        $status = request()->get('status');
        $category_id = request()->get('category_id');
        $code = request()->get('code');
        $start_day = request()->get('start_day');
        $end_day = request()->get('end_day');
        $voucher = DB::table('voucher')->select('voucher.*','categories.name as cat_name')->leftJoin('categories','categories.id','=','voucher.category_id')->where([['voucher.name','like','%'.$name.'%'],['code','like','%'.$code.'%']]);
        if($status == '1' || $status =='0'){
            $voucher->where('voucher.status',$status);
        }
        if($category_id){
            $voucher->where('category_id',$category_id);
        }
        if($start_day){
            $voucher->where('start_day','>=',$start_day);
        }
        if($end_day){
            $voucher->where('end_day','>=',$end_day);
        }
        $vouchers = $voucher->get();
        return response()->json($vouchers);
    }
    public function store(){
        $voucher = Voucher::create(
            request()->all(),
        );
        if($voucher){
            return response()->json(['success'=>'created success!']);
        }
        else{
            return response()->json(['error'=>'created failed!']);
        }
    }
    public function show($id){
        $voucher =  DB::table('voucher')->select('voucher.*','categories.name as cat_name')->leftJoin('categories','categories.id','=','voucher.category_id')->where('voucher.id',$id)->first();
        return response()->json($voucher);
    }
    public function update(Voucher $voucher,$id){
        $voucher = Voucher::findOrFail($id);
        $data = request()->all();
        $voucher->update($data);
        return response()->json(['success'=>'updated success!']);
    }
    public function delete($id){
        Voucher::find($id)->delete();
        return response()->json(['success'=>'deleted success!']);
    }
}