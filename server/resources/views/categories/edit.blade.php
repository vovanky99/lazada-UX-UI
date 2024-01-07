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
            {!! Form::open(['method'=>'PATCH','route'=>['dt.update',$cat->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('name','title: ',['class'=>'form-label']) !!}
                {!! Form::text('name',$cat->title.'',['class'=>'form-control',] ) !!}
                @error('title')
                <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('description','cat parent :',['class'=>'form-label']) !!}
                <select name="parent_id" id="" class="lz-border-secondary" >
                    <option value="#">null</option>
                    @foreach ($cat_parent as $c)  
                    <option value="{{$c->id}}" @if (!empty($cat->parent->id) && $c->id==$cat->parent->id)
                        selected   
                    @endif>{{$c->title}}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">

                <button type="submit" class="btn btn-primary" >update</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</section>
@endsection