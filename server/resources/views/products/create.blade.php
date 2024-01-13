@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 fs-4 text-capitalize" >    
            <h3>
                create Products
            </h3>
            {!! Form::open(['method'=>'POST','route'=>['products.store'],'enctype'=>'multipart/form-data']) !!}
            @method('POST')
            @csrf
            <div class="mb-3">
                {!! Form::label('','title: ',['class'=>'form-label']) !!}
                {!! Form::text('title','',['class'=>'form-control',] ) !!}
                @error('title')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','Images:',['class'=>'form-label']) !!}
                {!! Form::file('new_img',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}  
                @error('new_img')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','price: ',['class'=>'form-label']) !!}
                {!! Form::number('price','',['class'=>'form-control','min'=>'1'] ) !!}
                @error('price')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','discount :',['class'=>'form-label']) !!}
                {!! Form::number('discount','',['class'=>'form-control','min'=>'0','max'=>'100'] ) !!}
                @error('discount')
                <div class="alert text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('','email :',['class'=>'form-label']) !!}
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
                <select name="role" id="gender" class="lz-border-secondary outline-none form-control">
                    <option class="text-capitalize " value="#" selected>select role</option>
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
                {!! Form::number('level','1',['class'=>'lz-border-secondary outline-none form-control',]) !!}
            </div>

            <div class="mb-3">
                {!! Form::label('profile_status','status :',['class'=>'form-label']) !!}
                <select class="lz-border-secondary outline-none text-capitalize form-control" name="status" id="gender">
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
                <select class="lz-border-secondary outline-none text-capitalize form-control" name="gender" id="gender">
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
                {!! Form::date('birthday','dd/mm/yyyy',['class'=>'lz-border-secondary outline-none form-control',]) !!}
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

                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >create</button>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</section>
@endsection