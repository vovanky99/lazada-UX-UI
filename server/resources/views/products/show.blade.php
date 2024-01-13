@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                <?php echo "profile" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['users.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary">Users All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('profile_name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$users->name.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Avatar :',['class'=>'form-label']) !!}
                {!! Html::image(asset('upload/images').'/'.$users->avatar,'avatar',['class'=>'rounded avatar_users','disabled','alt'=>$users->avatar.'']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','username :',['class'=>'form-label']) !!}
                {!! Form::text('username',$users->username.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_email','email :',['class'=>'form-label']) !!}
                {!! Form::text('email',$users->email.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_phone','Phone Number :',['class'=>'form-label']) !!}
                {!! Form::text('phone_number',$users->phone_number.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_level','Level :',['class'=>'form-label']) !!}
                {!! Form::number('level',$users->level.'',['class'=>'form-control','disabled']) !!}
            </div>

            <div class="mb-3">
                <?php  
                $status = '' ;
                if ($users->status==1) {
                    $status = "show";
                }
                else {
                    $status = "hidden";
                }
                ?>
                {!! Form::label('profile_status','status :',['class'=>'form-label']) !!}
                {!! Form::text('status',$status.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                <?php  
                $gender = '' ;
                if ($users->gender==1) {
                    $gender = "male";
                }
                else {
                    $gender = "famale";
                }
                ?>
                {!! Form::label('profile_gender','gender :',['class'=>'form-label']) !!}
                {!! Form::text('gender',$gender.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_birthday','birthday :',['class'=>'form-label']) !!}
                {!! Form::date('birthday',$users->birthday.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('profile_address','address :',['class'=>'form-label']) !!}
                {!! Form::textarea('address',$users->address.'',['class'=>'form-control','disabled','rows'=>'3']) !!}
            </div>
            <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['users.edit',$users->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Edit</button>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</section>
@endsection