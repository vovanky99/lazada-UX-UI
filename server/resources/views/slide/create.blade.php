@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 fs-4 text-capitalize" >    
            <h3>
                create slide
            </h3>
            
            {!! Form::open(['method'=>'POST','route'=>['slide.store'],'enctype'=>'multipart/form-data']) !!}
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
                {!! Form::label('cat','cat: ',['class'=>'form-label ']) !!}
                <select name="categories_id"  class="lz-border-secondary outline-none form-control">
                    <option class="text-capitalize" value="#" selected>Select Cat</option>
                    @foreach ($cat as $c)
                    <option value="{{$c->id}}" >{{$c->title}}</option>
                    @endforeach
                </select>
                @error('cat')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','img: ',['class'=>'form-label']) !!}
                {!! Form::file('new_img',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                @error('new_img')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','start day: ',['class'=>'form-label']) !!}
                {!! Form::date('start_day','',['class'=>'form-control',] ) !!}
                @error('start_day')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','end day: ',['class'=>'form-label']) !!}
                {!! Form::date('end_day','',['class'=>'form-control',] ) !!}
                @error('end_day')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions','',['class'=>'form-control','row'=>'3'] ) !!}
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