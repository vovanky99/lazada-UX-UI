@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="row col-6 fs-5 text-capitalize">    
            <h3>
                slide
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['slide.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Slide All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['slide.update',$slide->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','title: ',['class'=>'form-label']) !!}
                {!! Form::text('title',$slide->title.'',['class'=>'form-control'] ) !!}
                @error('title')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','img: ',['class'=>'form-label']) !!}
                {!! Form::File('new_img',['class'=>'form-control mb-3','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}
                {!! Html::image(asset('upload/images/slide').'/'.$slide->img,'avatar',['class'=>'rounded avatar_users','alt'=>$slide->img.'']) !!}
                
            </div>
            <div class="mb-3">
                {!! Form::label('','Categories: ',['class'=>'form-label']) !!}
                {{-- {!! Form::text('owner',$shop->users->name.'',['class'=>'form-control']) !!} --}}
                <select name="categories_id" id="" class="form-control lz-border-secondary">
                    @foreach ($cat as $c)
                    <option value="{{$c->id}}" @if ($c->id==$slide->categories_id)
                        selected
                    @endif>{{$c->title}}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('','start day :',['class'=>'form-label']) !!}
                {!! Form::date('start_day',$slide->start_day.'',['class'=>'form-control']) !!}
                @error('new_img')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','end day :',['class'=>'form-label']) !!}
                {!! Form::date('end_day',$slide->end_day.'',['class'=>'form-control']) !!}
                @error('start_day')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$slide->descriptions.'',['class'=>'form-control'] ) !!}
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