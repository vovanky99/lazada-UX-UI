@extends('header')


@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper d-flex">
        <div class="row mb-3 col-6 fs-4 text-capitalize" >    
            <h3>
                Products
            </h3>
            {!! Form::open(['method'=>'GET','route'=>['products.index']]) !!}
            @csrf
                <button type="submit" class="btn lz-btn-outline-primary">Products All</button>
            {!! Form::close() !!}
            <div class="mb-3">
                {!! Form::label('','name :',['class'=>'form-label']) !!}
                {!! Form::text('name',$pd->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            
            <div class="mb-3">
                {!! Form::label('profile_status','status :',['class'=>'form-label']) !!}
                {!! Form::text('status',$pd->status==1?'show':'Hide',['class'=>'form-control','disabled']) !!}
            </div>
            
            <div class="mb-3">
                {!! Form::label('','Cat: ',['class'=>'form-label']) !!}
                {!! Form::text('categories_id',$pd->categories->title.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','shop: ',['class'=>'form-label']) !!}
                {!! Form::text('shop_id',$pd->shop->name.'',['class'=>'form-control','disabled'] ) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','Products Type: ',['class'=>'form-label']) !!}
                {!! Form::text('products_type',$pd->productsType->title.'',['class'=>'form-control','disabled'] ) !!}
            </div><div class="mb-3">
                {!! Form::label('','Products Type: ',['class'=>'form-label']) !!}
                {!! Form::text('products_type',!empty($pd->productsType1->title)?$pd->productsType1->title.'':'',['class'=>'form-control','disabled'] ) !!}
            </div><div class="mb-3">
                {!! Form::label('','Products Type: ',['class'=>'form-label']) !!}
                {!! Form::text('products_type',!empty($pd->productsType2->title)?$pd->productsType2->title.'':'',['class'=>'form-control','disabled'] ) !!}
            </div>
            
            <div class="mb-3">
                {!! Form::label('','discount: ',['class'=>'form-label']) !!}
                {!! Form::number('discount',$pd->discount.'%',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','price: ',['class'=>'form-label']) !!}
                {!! Form::number('price',$pd->price.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','quantities: ',['class'=>'form-label']) !!}
                {!! Form::number('quantities',$pd->quantities.'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','reviews: ',['class'=>'form-label']) !!}
                {!! Form::number('reviews',number_format(get_AvgReviewsStars($pd->id),1).'',['class'=>'form-control','disabled']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','Avatar :',['class'=>'form-label']) !!}
                {!! Html::image(asset('upload/images').'/'.$pd->images,'avatar',['class'=>'rounded avatar_users','disabled','alt'=>$pd->images.'']) !!}
            </div>
            <div class="mb-3">
                {!! Form::label('','Descriptions: ',['class'=>'form-label']) !!}
                {!! Form::textarea('descriptions',$pd->descriptions.'',['class'=>'form-control','disabled']) !!}
            </div>
            {{-- <div class="mb-3">
                {!! Form::open(['method'=>'GET','route'=>['products.update',$pd->id]]) !!}
                @csrf
                <button class="btn lz-btn-outline-primary text-capitalize fs-5" >Update</button>
                {!! Form::close() !!}
            </div> --}}
        </div>
    </div>
</section>
@endsection