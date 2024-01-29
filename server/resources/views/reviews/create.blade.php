@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 fs-4 text-capitalize" >    
            <h3>
                create Products
            </h3>
            {!! Form::open(['method'=>'POST','route'=>['products.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf<div class="mb-3">
                {!! Form::label('','title :',['class'=>'form-label']) !!}
                {!! Form::text('title','',['class'=>'form-control'] ) !!}
                @error('title')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('','discount: ',['class'=>'form-label']) !!}
                {!! Form::number('discount','',['class'=>'form-control','min'=>'1','max'=>'100','placeholder'=>'%']) !!}
                @error('discount')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','price: ',['class'=>'form-label']) !!}
                {!! Form::number('price','',['class'=>'form-control']) !!}
                @error('price')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','quantities: ',['class'=>'form-label']) !!}
                {!! Form::number('quantities','',['class'=>'form-control']) !!}
                @error('quantities')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','status :',['class'=>'form-label']) !!}
                {!! Form::select('status',['Hide','Show','Lock'],[],['class'=>'form-control']) !!}
                @error('status')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('','Cat:',['class'=>'form-label']) !!}
                <select name="categories_id" id="" class="form-control">
                    <option value="#" selected>Select Cat</option>
                    @foreach ($cat as $c)
                    <option value="{{$c->id}}">{{$c->title}}</option>
                    @endforeach
                </select>
                @error('categories_id')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','shop: ',['class'=>'form-label']) !!}
                <select name="shop_id" id="" class="form-control">
                    <option value="#" selected>Select Shop</option>
                    @foreach ($shop as $c)
                    <option value="{{$c->id}}">{{$c->name}}</option>
                    @endforeach
                </select>
                @error('shop_id')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','Products Type: ',['class'=>'form-label']) !!}
                <select name="products_type" id="" class="form-control">
                    <option value="" selected>Select Products Type</option>
                    @foreach ($productsType as $c)
                    <option value="{{$c->id}}">{{$c->title}}</option>
                    @endforeach
                </select>
                @error('products_type')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div><div class="mb-3">
                {!! Form::label('','Products Type 1: ',['class'=>'form-label']) !!}
                <select name="products_type1" id="" class="form-control">
                    <option value="" selected>Select Products Type 1</option>
                    @foreach ($productsType as $c)
                    <option value="{{$c->id}}">{{$c->title}}</option>
                    @endforeach
                </select>
                @error('products_type1')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div><div class="mb-3">
                {!! Form::label('','Products Type 2: ',['class'=>'form-label']) !!}
                <select name="products_type2" id="" class="form-control">
                    <option value="" selected>Select Products Type 2</option>
                    @foreach ($productsType as $c)
                    <option value="{{$c->id}}">{{$c->title}}</option>
                    @endforeach
                </select>
                @error('products_type2')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('','images: ',['class'=>'form-label']) !!}
                {!! Form::file('new_images',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                @error('new_images')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','Descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions','',['class'=>'form-control']) !!}
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