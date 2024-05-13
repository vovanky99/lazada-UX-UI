<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
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
        $payment = Payment::paginate(15);
        $count_pay = Payment::count();
        return view('payment/index',compact('payment','count_pay'));
    }

    public function search(Request $request){
        if(!empty($request->start_day) && !empty($request->end_day)){
            $payment = Payment::where('payment_datetime','>=',$request->start_day)->where('payment_datetime','<=',$request->end_day)->where('type','like','%'.$request->search.'%');
            $count_pay = $payment->count();
            $payment = $payment->paginate(15);
        }
        elseif(!empty($request->start_day)){
            $payment = Payment::where('payment_datetime','>=',$request->start_day)->where('type','like','%'.$request->search.'%');
            $count_pay = $payment->count();
            $payment = $payment->paginate(15);
        }
        elseif(!empty($request->end_day)){
            $payment = Payment::where('payment_datetime','<=',$request->end_day)->where('type','like','%'.$request->search.'%');
            $count_pay = $payment->count();
            $payment = $payment->paginate(15);
        }
        else{
            $payment = Payment::where('type','like','%'.$request->search.'%');
            $count_pay =  $payment->count();
            $payment = $payment->paginate(15);
        }
        $value_start_day = $request->start_day;
        $value_end_day = $request->end_day;
        return view('payment/index',compact('payment','count_pay','value_start_day','value_end_day'));
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
    }
}