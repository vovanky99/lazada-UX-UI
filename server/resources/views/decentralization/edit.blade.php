@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="mb-3 col-6 fs-4 text-capitalize" >   
            <h3>
                <?php echo "profile" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['dt.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Decentralization All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['dt.update',$decentralization->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$decentralization->name.'',['class'=>'form-control',] ) !!}
                @error('name')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('description','description :',['class'=>'form-label']) !!}
                {!! Form::textarea('description',$decentralization->description.'',['class'=>'form-control','rows'=>'3']) !!}
                @error('description')
                <div class="alert alert-danger">{{ $message }}</div>
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