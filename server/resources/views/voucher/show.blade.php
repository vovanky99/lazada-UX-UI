@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                voucher
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['voucher.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3 text-capitalize">voucher All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('profile_name','title :',['class'=>'form-label']) !!}
                {!! Form::text('title',$voucher->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','code: ',['class'=>'form-label']) !!}
                {!! Form::text('code',$voucher->code.'',['class'=>'form-control','disabled'] ) !!}
                @error('code')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','percents: ',['class'=>'form-label']) !!}
                {!! Form::number('percents',$voucher->percents.'',['class'=>'form-control','max'=>'100','min'=>'0','disabled'] ) !!}
                @error('percents')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','quantity: ',['class'=>'form-label']) !!}
                {!! Form::text('quantity',$voucher->quantity.'',['class'=>'form-control','min'=>'1','max'=>'1000','disabled'] ) !!}
                @error('quantity')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','Categories: ',['class'=>'form-label']) !!}
                <select name="categories_id" class=" form-control fs-5  px-2 py-2 lz-border-secondary outline-none me-3" disabled>
                    <option value="<?php echo $voucher->categories->id ?>"><?php echo $voucher->categories->title ?></option>
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('','Product Type: ',['class'=>'form-label']) !!}
                <select name="products_type_id" class=" form-control fs-5  px-2 py-2 lz-border-secondary outline-none me-3" disabled>
                    <option value="<?php echo $voucher->productsType->id ?>"><?php echo $voucher->productsType->title ?></option>
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$voucher->descriptions.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['voucher.edit',$voucher->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
@endsection