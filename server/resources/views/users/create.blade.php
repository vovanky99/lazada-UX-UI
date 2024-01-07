@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 fs-4 text-capitalize" >    
            <h3>
                create user
            </h3>
            
            {!! Form::open(['method'=>'POST','route'=>['users.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">

                {!! Form::label('profile_name','name: ',['class'=>'form-label']) !!}
                {!! Form::text('name','',['class'=>'form-control',] ) !!}
                @error('name')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Avatar :',['class'=>'form-label']) !!}
                {!! Form::file('new_avatar',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                @error('new_avatar')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','username :',['class'=>'form-label']) !!}
                {!! Form::text('username','',['class'=>'form-control',] ) !!}
                @error('username')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_password','password :',['class'=>'form-label']) !!}
                {!! Form::text('password','',['class'=>'form-control',] ) !!}
                @error('password')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_email','email :',['class'=>'form-label']) !!}
                {!! Form::text('email','',['class'=>'form-control',] ) !!}
                @error('email')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_phone','Phone Number :',['class'=>'form-label']) !!}
                {!! Form::text('phone_number','',['class'=>'form-control']) !!}
                @error('phone_number')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_decentralization','Role: ',['class'=>'form-label ']) !!}
                <select name="role" id="gender" class="lz-border-secondary outline-none">
                    <option class="text-capitalize" value="#" selected>select role</option>
                    @foreach ($decentralization as $dt)
                    <option value="{{$dt->id}}" >{{$dt->name}}</option>
                    @endforeach
                </select>
                @error('role')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_level','Level :',['class'=>'form-label']) !!}
                {!! Form::number('level','1',['class'=>'lz-border-secondary outline-none',]) !!}
            </div>

            <div class="mb-3">
                {!! Form::label('profile_status','status :',['class'=>'form-label']) !!}
                <select class="lz-border-secondary outline-none text-capitalize" name="status" id="gender">
                    <option value="#" selected>select status</option>
                    <option value="1" >show</option>
                    <option value="0" >hide</option>
                </select>
                @error('status')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_gender','gender :',['class'=>'form-label']) !!}
                <select class="lz-border-secondary outline-none text-capitalize" name="gender" id="gender">
                    <option value="#" selected>select gender</option>
                    <option value="1" >male</option>
                    <option value="0" >female</option>
                </select>
                @error('gender')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('profile_birthday','birthday :',['class'=>'form-label']) !!}
                {!! Form::date('birthday','dd/mm/yyyy',['class'=>'lz-border-secondary outline-none',]) !!}
                @error('birthday')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_address','address :',['class'=>'form-label']) !!}
                {!! Form::textarea('address','',['class'=>'form-control','rows'=>'3']) !!}
                @error('address')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">

                <button class="btn btn-primary" >create</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</section>
@endsection