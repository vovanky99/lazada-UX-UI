@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['reviews.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('Reviews','',['class'=>'me-2 text-capitalize fs-22']) !!}
            {{-- <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create Reviews</button> --}}
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_reviews  ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['reviews.search']]) !!}
                @csrf
                {!! Form::text('search',!empty($selected_search)?$selected_search.'':'',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search Products',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

                {!! Form::close() !!}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            {{-- {!! Form::open(['method'=>'DELETE','route'=>['products.dl_multiple']]) !!} --}}
            {!! Form::button('delete',['type' => 'submit',
            'class' => 'delete_all delete_all-reviews btn lz-btn-outline-danger text-capitalize fs-5  px-4 py-2 me-3']) !!}
            {{-- {!! Form::close() !!} --}}
            {!! Form::open(['method'=>'GET','route'=>['reviews.search']]) !!}
            @csrf
            <select name="search_cat" class="ui search dropdown fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                <option value="#">Users</option>
                @foreach ($users as $c)
                <option value="<?php echo $c->id ?>"  @if (!empty($selected_users) && $selected_users == $c->id)
                    selected
                @endif><?php echo $c->name ?></option>
                @endforeach
            </select>
            {!! Form::text('search_shop',!empty($selected_products)?$selected_products.'':'',['class'=>'me-3 fs-5  px-2 py-2 lz-border-secondary search-users outline-none','placeholder'=>'Enter Reviews...']) !!}
            {!! Form::submit('Change',['class'=>' fs-5 lz-btn-outline-primary px-5 py-2']) !!}

            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th><input id="check_all" type="checkbox"></th>
                    <th scope="col">title</th>
                    <th scope="col">content reviews</th>
                    <th scope="col">reviews stars</th>
                    {{-- <th scope="col">products sold</th> --}}
                    <th scope="col">parent</th> 
                    <th scope="col">users</th>
                    <th scope="col">products</th>
                    <th scope="col">tools</th>
                </tr>
            </thead>
            @foreach($reviews as $item)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td class=" align-middle "><input class="checkbox"  data-id="{{$item->id}}" id="cb-select-{{$item->id}}" type="checkbox"></td>
                    <td><?php echo $item->title ?></td>
                    <td><?php echo $item->content_reviews ?></td>
                    <td><?php echo $item->reviews_stars ?></td>
                    {{-- <td><?php  ?></td> --}}
                    <td><?php echo !empty($item->parent->title)?$item->parent->title:'' ?></td>
                    <td><?php echo !empty($item->users->name)?$item->users->name:$item->users_name ?></td>
                    <td><?php echo !empty($item->products->title)?$item->products->title:$item->products_title ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {{-- {!! Form::open(['method'=>'GET','route'=>['reviews.show',$item->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!} --}}
                            {!! Form::open(['method'=>'DELETE','route'=>['reviews.destroy',$item->id]]) !!}
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
                    {{$reviews->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection