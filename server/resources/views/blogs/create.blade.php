@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 fs-4 text-capitalize" >    
            <h3>
                create blogs
            </h3>
            
            {!! Form::open(['method'=>'POST','route'=>['blogs.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">

                {!! Form::label('profile_name','title: ',['class'=>'form-label']) !!}
                {!! Form::text('title','',['class'=>'form-control',] ) !!}
                @error('name')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('users','Users: ',['class'=>'form-label ']) !!}
                <select name="categories_id" class="lz-border-secondary outline-none form-control">
                    <option class="text-capitalize" value="#" selected>Select Categories</option>
                    @foreach ($cat as $c)
                    <option value="{{$c->id}}" >{{$c->title}}</option>
                    @endforeach
                </select>
                @error('cat')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','image: ',['class'=>'form-label']) !!}
                {!! Form::file('new_img',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                @error('new_img')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions','',['class'=>'form-control','rows'=>'3'] ) !!}
                @error('descriptions')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','status: ',['class'=>'form-label']) !!}
                <select name="status" id="">
                    <option value="0">hide</option>
                    <option value="1">show</option>
                </select>
                @error('status')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','content: ',['class'=>'form-label']) !!}
                {!! Form::textarea('content','',['class'=>'form-control',]) !!}
                @error('content')
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