@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="mb-3 fs-4 text-capitalize" >    
            <h3>
                create product type
            </h3>
            
            {!! Form::open(['method'=>'POST','route'=>['voucher.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">

                {!! Form::label('profile_name','title: ',['class'=>'form-label']) !!}
                {!! Form::text('title','',['class'=>'form-control',] ) !!}
                @error('title')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','code: ',['class'=>'form-label']) !!}
                {!! Form::text('code','',['class'=>'form-control',] ) !!}
                @error('code')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','percents: ',['class'=>'form-label']) !!}
                {!! Form::number('percents','',['class'=>'form-control','max'=>'100','min'=>'0'] ) !!}
                @error('percents')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','quantity: ',['class'=>'form-label']) !!}
                {!! Form::text('quantity','',['class'=>'form-control','min'=>'1','max'=>'1000'] ) !!}
                @error('quantity')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','Categories: ',['class'=>'form-label']) !!}
                <select name="categories_id" class=" form-control fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                    <option value="0">Categories</option>
                    @foreach ($cat as $c)
                    <option value="<?php echo $c->id ?>"><?php echo $c->title ?></option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('','Product Type: ',['class'=>'form-label']) !!}
                <select name="products_type_id" class=" form-control fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                    <option value="0">Product Type</option>
                    @foreach ($cat as $pd)
                    <option value="<?php echo $pd->id ?>"><?php echo $pd->title ?></option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions','',['class'=>'form-control',] ) !!}
                @error('descriptions')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">

                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >create</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</section>
@endsection