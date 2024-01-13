@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
            {!! Form::open(['method'=>'GET','route'=>['cat.create']]) !!}
            {!! Form::label('cat','',['class'=>'me-2 text-capitalize fs-22 align-middle']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">create</button>
            @csrf
            {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_cat ?>)</span>
            <div class="search-cat">
                {!! Form::open(['method'=>'GET','route'=>['cat.search']]) !!}
                @csrf
                    {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                    {!! Form::submit('Search Cat',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {!! Form::close() !!}
            </div>
        </div>
        <table class="table table-bordered lz-border-secondary text-center">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">tools</th>
                </tr>
            </thead>

            <?php $i=1;  ?>
            @foreach($categories as $cat)
            <tbody  class="bg-light">
                <tr class="fs-5 h-50">
                    <th><?php echo $i++ ?></th>
                    <td><?php echo $cat->title ?></td>
                    <td>
                        <div class="d-flex flex-row gap-2 justify-content-center">
                            {!! Form::open(['method'=>'GET','route'=>['cat.show',$cat->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['cat.destroy',$cat->id]]) !!}
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
            <div class="pagination" >
          
            {{$categories->appends(Request::except('page'))->links();}}
            
           
            </div>
        </table>
    </div>
</section>
@endsection