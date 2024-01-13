@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['blogs.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('blogs','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create blogs</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_blogs ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['blogs.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search Shop',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {{-- {!! Form::close() !!} --}}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            {{-- {!! Form::open(['method'=>'GET','route'=>['users.search']]) !!} --}}
            @csrf
            <select name="search_cat" class="px-2 py-2 lz-border-secondary outline-none fs-5 me-3">
                <option value="0" >Categories</option>
                @foreach ($cat as $c)
                <option value="<?php echo $c->id ?>" <?php 
                if(!empty($selected_cat) && $selected_cat==$c->id ){ ?> selected <?php } 
                ?> ><?php echo $c->title ?></option>
                @endforeach
            </select>
            <div class="text-success">
                @if (session()->has('success'))
                {{ session()->get('success') }}
                @endif
            </div>
            {!! Form::submit('Change',['class'=>' lz-btn-outline-primary px-5 py-2 fs-5']) !!}

            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th scope="col">name</th>
                    <th scope="col">logo</th>
                    <th scope="col">descriptions</th>
                    <th scope="col">content</th>
                    <th scope="col">status</th>
                    <th scope="col">cat</th>
                    <th scope="col">tool</th>
                </tr>
            </thead>

            @foreach($blogs as $b)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td><?php echo $b->title ?></td>
                    <td>
                        <img class="img" src="{{asset('upload/images/blogs')}}/{{$b->img}}" />
                    </td>
                    <td><?php echo $b->descriptions ?></td>
                    <td class="text-truncate max-width-300"><?php echo $b->content ?></td>
                    <td><?php echo ($b->status==1)?'show':'hide' ?></td>
                    <td><?php echo $b->categories->title ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['blogs.show',$b->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['blogs.destroy',$b->id]]) !!}
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
            <div class="col-6">
                <div class="mt-2 align-items-center d-flex">
                </div>
            </div>
            <div class="col-6">
                <div class="pagination" >
                    {{$blogs->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection