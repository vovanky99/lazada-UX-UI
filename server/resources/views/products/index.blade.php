@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['products.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('Products','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create Products</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_products  ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['products.search']]) !!}
                @csrf
                {!! Form::text('search',!empty($selected_search)?$selected_search.'':'',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search products',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

                {!! Form::close() !!}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            {{-- {!! Form::open(['method'=>'DELETE','route'=>['products.dl_multiple']]) !!} --}}
            {!! Form::button('delete',['type' => 'submit',
            'class' => 'delete_all delete_all-products btn lz-btn-outline-danger text-capitalize fs-5  px-4 py-2 me-3']) !!}
            {{-- {!! Form::close() !!} --}}
            {!! Form::open(['method'=>'GET','route'=>['products.search']]) !!}
            @csrf
            <select name="search_cat" class=" fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                <option value="#">Categories</option>
                @foreach ($cat as $c)
                <option value="<?php echo $c->id ?>"  @if (!empty($selected_cat) && $selected_cat == $c->id)
                    selected
                @endif><?php echo $c->title ?></option>
                @endforeach
            </select>
            {!! Form::text('search_shop',!empty($selected_shop)?$selected_shop.'':'',['class'=>'me-3 fs-5  px-2 py-2 lz-border-secondary search-users outline-none','placeholder'=>'Enter Shop...']) !!}
            {!! Form::submit('Change',['class'=>' fs-5 lz-btn-outline-primary px-5 py-2']) !!}

            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th><input id="check_all" type="checkbox"></th>
                    <th scope="col">title</th>
                    <th scope="col">images</th>
                    <th scope="col">price</th>
                    <th scope="col">reviews stars</th>
                    {{-- <th scope="col">products sold</th> --}}
                    <th scope="col">quantities</th> 
                    <th scope="col">cat</th>
                    <th scope="col">shop</th>
                    <th scope="col">tools</th>
                </tr>
            </thead>
            @foreach($products as $pd)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td class=" align-middle "><input class="checkbox"  data-id="{{$pd->id}}" id="cb-select-{{$pd->id}}" type="checkbox"></td>
                    <td><?php echo $pd->title ?></td>
                    <td class="col-2">
                        <img class="img" src="{{asset('upload/images/products')}}/{{$pd->images}}" />
                    </td>
                    <td><?php echo $pd->price ?></td>
                    <td><?php echo number_format(get_AvgReviewsStars($pd->id),1) ?></td>
                    {{-- <td><?php  ?></td> --}}
                    <td><?php echo $pd->quantities ?></td>
                    <td><?php echo !empty($pd->categories->title)?$pd->categories->title:$pd->cat_title ?></td>
                    <td><?php echo !empty($pd->shop->name)?$pd->shop->name:$pd->shop_name ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['products.show',$pd->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['products.destroy',$pd->id]]) !!}
                            @csrf
                            {!! Form::button('delete',['type' => 'submit',
                            'class' => 'btn lz-btn-outline-danger text-capitalize',
                            'onclick' => "return confirm('Are you sure?')"]) !!}
                            {!! Form::close() !!}
                               
                        </div> 
                    </td>
                </tr>
            </tbody>
            @endforeach
            
        </table>
        <div class="row">
            <div class="col-12">
                <div class="pagination" >
                    {{$products->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection