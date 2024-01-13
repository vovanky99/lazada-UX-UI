@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex ">
        <div class="fs-4 text-capitalize">    
            <h3>
                <?php echo "profile" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['cat.index']]) !!}
            @csrf
                <button type="submit" class="btn btn-primary">Cat All</button>
            {!! Form::close() !!}
            <div class="mb-3 ">
                {!! Form::label('name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$cat->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
        
            <div class="mb-3">
                {!! Form::label('description','cat parent :',['class'=>'form-label']) !!}
                <select name="parent_id" id="" class="lz-border-secondary" disabled>
                    @if (!empty($cat->parent_id))    
                    <option value="{{$cat->parent_id}}">{{$cat->parent->title}}</option>
                    @else
                    <option value="#">null</option>
                    @endif
                </select>
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['cat.edit',$cat->id]]) !!}
                @csrf
                <button class="btn btn-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>        
    </div>
</section>
@endsection