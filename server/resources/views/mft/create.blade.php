@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="mb-3 fs-4 text-capitalize" >    
            <h3>
                create manuf
            </h3>
            
            {!! Form::open(['method'=>'POST','route'=>['mft.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">

                {!! Form::label('profile_name','name: ',['class'=>'form-label']) !!}
                {!! Form::text('name','',['class'=>'form-control',] ) !!}
                @error('name')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Logo :',['class'=>'form-label']) !!}
                {!! Form::file('new_logo',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                @error('new_logo')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
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