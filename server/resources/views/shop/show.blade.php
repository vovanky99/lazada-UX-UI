@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                <?php echo "shop" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['shop.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Shop All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('profile_name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$shop->name.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Avatar :',['class'=>'form-label']) !!}
                {!! Html::image(asset('upload/images/shop/logo').'/'.$shop->logo,'avatar',['class'=>'rounded avatar_users','disabled','alt'=>$shop->logo.'']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','img cover:',['class'=>'form-label']) !!}
                {!! Html::image(asset('upload/images/shop/img_cover').'/'.$shop->img_cover,'avatar',['class'=>'rounded avatar_users','disabled','alt'=>$shop->img_cover.'']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$shop->descriptions.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            
            <div class="mb-3">
                {!! Form::label('profile_gender','owner :',['class'=>'form-label']) !!}
                {!! Form::text('owner',$shop->users->name.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_address','address :',['class'=>'form-label']) !!}
                {!! Form::textarea('address',$shop->address.'',['class'=>'form-control','disabled','rows'=>'3']) !!}
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['shop.edit',$shop->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
@endsection