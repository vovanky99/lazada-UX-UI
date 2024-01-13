@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="fs-4 text-capitalize" >    
            <h3>
                <?php echo "profile" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['cat.index']]) !!}
            @csrf
            <button type="submit" class="btn lz-btn-outline-primary mb-3 text-capitalize">Category All</button>          
            {!! Form::close() !!}
            {!! Form::open(['method'=>'POST','route'=>['cat.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">
                {!! Form::label('title','title :',['class'=>'form-label']) !!}
                {!! Form::text('title','',['class'=>'form-control ',] ) !!}
                @error('title')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="mb-1">
                {!! Form::label('category','categories :',['class'=>'form-label']) !!}
                <select name="cat_id" id="cat_id" class="lz-border-secondary ">
                    <option value="0" selected>parent id</option>
                    @foreach ($cat as $c)
                        <option value="{{$c->id}}">{{$c->title}}</option>
                    @endforeach
                </select>
                <option value="" selected></option>
            </div>
            <div class="mb-3">
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >create</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
    
</section>
@endsection