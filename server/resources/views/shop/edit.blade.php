@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="row col-6 fs-5 text-capitalize">    
            <h3>
                <?php echo "shop" ?>
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['shop.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary mb-3">Shop All</button>
            {!! Form::close() !!}
            {!! Form::open(['method'=>'PATCH','route'=>['shop.update',$shop->id],'enctype'=>'multipart/form-data']) !!}
            @method('PATCH')
            @csrf
            <div class="mb-3">
                {!! Form::label('profile_name','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$shop->name.'',['class'=>'form-control'] ) !!}
                @error('name')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','Avatar :',['class'=>'form-label']) !!}
                {!! Form::File('new_logo',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}
                {!! Html::image(asset('upload/images/shop/logo').'/'.$shop->logo,'avatar',['class'=>'rounded avatar_users','alt'=>$shop->logo.'']) !!}
                @error('new_logo')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_avatar','img cover:',['class'=>'form-label']) !!}
                {!! Form::File('new_img_cover',['class'=>'form-control','id'=>'formFile','for'=>'Select Images' ,'accept'=>'image/*']) !!}
                {!! Html::image(asset('upload/images/shop/img_cover').'/'.$shop->img_cover,'avatar',['class'=>'rounded avatar_users','alt'=>$shop->img_cover.'']) !!}
                @error('new_img_cover')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            <div class="mb-3">
                {!! Form::label('profile_username','descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$shop->descriptions.'',['class'=>'form-control'] ) !!}
                @error('descriptions')
                    <div class="text-danger">
                        {{$message}}
                    </div>
                @enderror
            </div>
            
            <div class="mb-3">
                {!! Form::label('profile_gender','owner :',['class'=>'form-label']) !!}
                {{-- {!! Form::text('owner',$shop->users->name.'',['class'=>'form-control']) !!} --}}
                <select name="owner" id="" class="form-control lz-border-secondary">
                    @foreach ($users as $user)
                    <option value="{{$user->id}}" @if ($user->id==$shop->users_id)
                        selected
                    @endif>{{$user->name}}</option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                {!! Form::label('profile_address','address :',['class'=>'form-label']) !!}
                {!! Form::textarea('address',$shop->address.'',['class'=>'form-control','rows'=>'3']) !!}
                @error('address')
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