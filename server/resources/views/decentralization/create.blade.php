@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="mb-3 fs-4 text-capitalize" >    
            <h3>
                <?php echo "profile" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['dt.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Decentralization All</button>
                
            {!! Form::close() !!}
            
            {!! Form::open(['method'=>'POST','route'=>['dt.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">

                {!! Form::label('name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name','',['class'=>'form-control',] ) !!}
                @error('name')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('description','description :',['class'=>'form-label']) !!}
                {!! Form::textarea('description','',['class'=>'form-control','rows'=>'3']) !!}
            </div>
            <div class="mb-3">
                <button class="btn lz-btn-outline-primary text-capitalize" >create</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</section>
@endsection