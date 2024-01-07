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
            <div class="mb-3">
                {!! Form::label('name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$decentralization->name.'',['class'=>'form-control','disabled'] ) !!}
            </div>
        
            <div class="mb-3">
                {!! Form::label('description','description :',['class'=>'form-label']) !!}
                {!! Form::textarea('description',$decentralization->description.'',['class'=>'form-control','disabled','rows'=>'3']) !!}
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['dt.edit',$decentralization->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
    
</section>
@endsection