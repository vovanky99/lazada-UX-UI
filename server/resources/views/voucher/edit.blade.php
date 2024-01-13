@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="col-6 fs-5 text-capitalize">    
            <h3>
                edit voucher
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['voucher.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3 text-capitalize">voucher All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['voucher.update',$voucher->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','title :',['class'=>'form-label']) !!}
                {!! Form::text('title',$voucher->title.'',['class'=>'form-control'] ) !!}
                @error('title')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','code: ',['class'=>'form-label']) !!}
                {!! Form::text('code',$voucher->code.'',['class'=>'form-control',] ) !!}
                @error('code')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','percents: ',['class'=>'form-label']) !!}
                {!! Form::number('percents',$voucher->percents.'',['class'=>'form-control','max'=>'100','min'=>'0'] ) !!}
                @error('percents')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','quantity: ',['class'=>'form-label']) !!}
                {!! Form::text('quantity',$voucher->quantity.'',['class'=>'form-control','min'=>'1','max'=>'1000'] ) !!}
                @error('quantity')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','Categories: ',['class'=>'form-label']) !!}
                <select name="categories_id" class=" form-control fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                    <option value="0">Categories</option>
                    @foreach ($cat as $c)
                    <option value="<?php echo $c->id ?>" @if ($voucher->categories_id == $c->id)
                        selected
                    @endif><?php echo $c->title ?></option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('','Product Type: ',['class'=>'form-label']) !!}
                <select name="products_type_id" class=" form-control fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                    <option value="0">Product Type</option>
                    @foreach ($pd_type as $pd)
                    <option value="<?php echo $pd->id ?>" @if ($voucher->products_type_id == $pd->id)
                        selected
                    @endif><?php echo $pd->title ?></option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$voucher->descriptions.'',['class'=>'form-control'] ) !!}
                @error('descriptions')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                <button type="submit" class="btn lz-btn-outline-primary text-capitalize fs-5" >update</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</section>
@endsection