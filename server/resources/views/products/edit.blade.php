@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="row col-6 fs-4 text-capitalize">    
            <h3>
                <?php echo "profile" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['users.index']]) !!}
                <button type="submit" class="btn lz-btn-outline-primary">Users All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['users.update',$users->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$users->name.'',['class'=>'form-control',] ) !!}
                @error('name')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Avatar :',['class'=>'form-label']) !!}
                {!! Form::file('new_avatar',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                <?php 
                $avatar = $users->avatar;
                $new_avatar = request()->file('new_avatar');
                if(!empty($new_avatar)){
                    $avatar = $new_avatar;
                }
                
                ?>

                {!! Html::image(asset('upload/images').'/'.$avatar,'avatar',['class'=>'rounded avatar_users','alt'=>$users->avatar.'']) !!}
                @error('new_avatar')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','username :',['class'=>'form-label']) !!}
                {!! Form::text('username',$users->username.'',['class'=>'form-control',] ) !!}
                @error('username')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_email','email :',['class'=>'form-label']) !!}
                {!! Form::text('email',$users->email.'',['class'=>'form-control',] ) !!}
                @error('email')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_phone','Phone Number :',['class'=>'form-label']) !!}
                {!! Form::text('phone_number',$users->phone_number.'',['class'=>'form-control']) !!}
                @error('phone_number')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_level','Level :',['class'=>'form-label']) !!}
                {!! Form::number('level',$users->level.'',['class'=>'form-control',]) !!}
            </div>

            <div class="mb-3">
                <?php  
                
                $status_other='';
                $status = '';
                if ($users->status==1) {
                    $status = "show";
                    $status_other = 'hidden';
                }
                else {
                    $status = "hidden"; 
                    $status_other = 'show';
                }
                ?>
                {!! Form::label('profile_status','status :',['class'=>'form-label']) !!}
                {!! Form::select('status',[$status.'',$status_other.''],['class'=>'form-control']) !!}
                @error('status')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_gender','gender :',['class'=>'form-label']) !!}
                <select name="gender" id="gender">
                    <?php ?>
                    <option value="<?php if($users->gender==1){echo 1;}else{echo 0;} ?>" selected><?php 
                    if($users->gender==1){ echo "male"; }else{echo "famale";} ?></option>
                    <option value="<?php if($users->gender==1){echo 0;}else { echo 1;}  ?>"><?php if($users->gender==1){ echo "female"; }else{echo "male";}?></option>
                    <?php ?>
                </select>
                @error('gender')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('profile_birthday','birthday :',['class'=>'form-label']) !!}
                {!! Form::date('birthday',$users->birthday.'',['class'=>'form-control',]) !!}
                @error('birthday')
                    <div class="text text-danger" >{{$message}}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_address','address :',['class'=>'form-label']) !!}
                {!! Form::textarea('address',$users->address.'',['class'=>'form-control','rows'=>'3']) !!}
                @error('address')
                    <div class="text text-danger" >{{$message}}</div>
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