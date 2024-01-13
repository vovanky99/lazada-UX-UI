@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['payment.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('Payment','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create Payment</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_pay ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['payment.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search payment',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {{-- {!! Form::close() !!} --}}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            <div class="text-success">
                @if (session()->has('success'))
                {{ session()->get('success') }}
                @endif
            </div>
            <div class="me-3">
                {!! Form::date('start_day',!empty($value_start_day)?$value_start_day.'':'', ['class'=>'px-2 py-2 lz-border-secondary outline-none']) !!}
            </div>
            <div class="me-3">
                {!! Form::date('end_day',!empty($value_end_day)?$value_end_day.'':'', ['class'=>'px-2 py-2 lz-border-secondary outline-none']) !!}
            </div>
            {!! Form::submit('Change',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th scope="col">type</th>
                    <th scope="col">payment datetime</th>
                    <th scope="col">tool</th>
                </tr>
            </thead>

            @foreach($payment as $pay)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td><?php echo $pay->type ?></td>
                    <td><?php echo $pay->payment_datetime ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
{{--     
                            {!! Form::open(['method'=>'GET','route'=>['payment.show',$pay->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!} --}}
                            {!! Form::open(['method'=>'DELETE','route'=>['payment.destroy',$pay->id]]) !!}
                            @csrf
                            {!! Form::button('delete',['type' => 'submit',
                            'class' => 'btn lz-btn-outline-danger text-capitalize',
                            'onclick' => "return confirm('Are you sure?')"]) !!}
                            {!! Form::close() !!}
                               
                        </div> 
                    </td>
                </tr>
            </tbody>
            @endforeach
            
        </table>
        <div class="row">
            <div class="col-6">
                <div class="mt-2 align-items-center d-flex">
                </div>
            </div>
            <div class="col-6">
                <div class="pagination" >
                    {{$payment->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection