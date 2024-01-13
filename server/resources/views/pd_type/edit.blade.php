@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="col-6 fs-5 text-capitalize">    
            <h3>
                edit products type
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['pd_type.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3 text-capitalize">products type All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['pd_type.update',$pd_type->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','title :',['class'=>'form-label']) !!}
                {!! Form::text('title',$pd_type->title.'',['class'=>'form-control'] ) !!}
                @error('title')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$pd_type->descriptions.'',['class'=>'form-control'] ) !!}
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