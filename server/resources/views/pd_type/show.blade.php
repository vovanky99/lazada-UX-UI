@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                <?php echo "manuf detail" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['pd_type.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3 text-capitalize">products type All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('profile_name','title :',['class'=>'form-label']) !!}
                {!! Form::text('title',$pd_type->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$pd_type->descriptions.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['pd_type.edit',$pd_type->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
@endsection