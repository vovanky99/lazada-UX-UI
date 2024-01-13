@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                <?php echo "shop" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['blogs.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Blogs All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('profile_name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$blogs->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','img cover:',['class'=>'form-label']) !!}
                {!! Html::image(asset('upload/images/shop/img_cover').'/'.$blogs->img,'avatar',['class'=>'rounded avatar_users','disabled','alt'=>$blogs->img.'']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$blogs->descriptions.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','status: ',['class'=>'form-label']) !!}
                <select name="status" id="" class="form-control" disabled>
                    <option value="{{$blogs->status}}">{{($blogs->status==1)?'show':'hide'}}</option>
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('profile_gender','cat: ',['class'=>'form-label']) !!}
                {!! Form::text('cat',$blogs->categories->title.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_address','content: ',['class'=>'form-label']) !!}
                {!! Form::textarea('content',$blogs->content.'',['class'=>'form-control','disabled','rows'=>'3']) !!}
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['blogs.edit',$blogs->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
@endsection