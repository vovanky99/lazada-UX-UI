@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                slide
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['slide.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Slide All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('','title: ',['class'=>'form-label']) !!}
                {!! Form::text('title',$slide->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','img cover:',['class'=>'form-label']) !!}
                {!! Html::image(asset('upload/images/shop/img_cover').'/'.$slide->img,'avatar',['class'=>'rounded avatar_users','disabled','alt'=>$slide->img.'']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_gender','cat: ',['class'=>'form-label']) !!}
                {!! Form::text('cat',$slide->categories->title.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','start day :',['class'=>'form-label']) !!}
                {!! Form::date('start_day',$slide->start_day.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','end day :',['class'=>'form-label']) !!}
                {!! Form::date('end_day',$slide->end_day.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$slide->descriptions.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['slide.edit',$slide->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
@endsection