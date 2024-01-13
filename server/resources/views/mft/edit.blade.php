@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="col-6 fs-5 text-capitalize">    
            <h3>
                <?php echo "manuf detail edit" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['mft.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Shop All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['mft.update',$mft->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$mft->name.'',['class'=>'form-control'] ) !!}
                @error('name')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Avatar :',['class'=>'form-label']) !!}
                {!! Form::File('new_logo',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}
                {!! Html::image(asset('upload/images/manuf').'/'.$mft->logo,'avatar',['class'=>'rounded avatar_users','alt'=>$mft->logo.'']) !!}
                @error('new_logo')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$mft->descriptions.'',['class'=>'form-control'] ) !!}
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