@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="row col-6 fs-5 text-capitalize">    
            <h3>
                edit blogs
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['blogs.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Blogs All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['blogs.update',$blogs->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','title: ',['class'=>'form-label']) !!}
                {!! Form::text('title',$blogs->title.'',['class'=>'form-control'] ) !!}
                @error('title')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Img: ',['class'=>'form-label']) !!}
                {!! Form::File('new_img',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}
                {!! Html::image(asset('upload/images/blogs').'/'.$blogs->img,'avatar',['class'=>'rounded avatar_users','alt'=>$blogs->img.'']) !!}
                @error('new_img')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','status: ',['class'=>'form-label']) !!}
                <select name="status" id="" class="form-control">
                    <option value="{{$blogs->status}}"  selected>{{($blogs->status==0)?'hide':'show'}}</option>
                    <option value="{{($blogs->status==1)?'0':'1'}}">{{($blogs->status==1)?'hide':'show'}}</option>
                </select>
                @error('status')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_gender','cat:',['class'=>'form-label']) !!}
                {{-- {!! Form::text('owner',$shop->users->name.'',['class'=>'form-control']) !!} --}}
                <select name="categories_id" id="" class="form-control lz-border-secondary">
                    @foreach ($cat as $c)
                    <option value="{{$c->id}}" @if ($c->id==$blogs->categories_id)
                        selected
                    @endif>{{$c->title}}</option>
                    @endforeach
                </select>
                @error('categories_id')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$blogs->descriptions.'',['class'=>'form-control','rows'=>'3'] ) !!}
                @error('descriptions')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('profile_address','content: ',['class'=>'form-label']) !!}
                {!! Form::textarea('content',$blogs->content.'',['class'=>'form-control']) !!}
                @error('content')
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