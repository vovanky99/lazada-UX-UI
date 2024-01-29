@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['dt.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('users','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create Role</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_role ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['dt.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search Role',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

                {!! Form::close() !!}
            </div>
        </div>

  
    <table class="table table-bordered lz-border-secondary">
        <thead class="bg-white">
            <tr class="text-capitalize">
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col">tools</th>
            </tr>
        </thead>

        <?php $i=1;  ?>
        @foreach($role as $dt)
        <tbody>
            <tr>
                <th><?php echo $i++ ?></th>
                <td><?php echo $dt->name ?></td>
                <td><?php echo $dt->description ?></td>
                <td class="d-flex align-items-center gap-2">

                {!! Form::open(['method'=>'GET','route'=>['dt.show',$dt->id]]) !!}
                @csrf
                    <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                {!! Form::close() !!}
                {!! Form::open(['method'=>'DELETE','route'=>['dt.destroy',$dt->id]]) !!}
                @csrf
                {!! Form::button('delete',['type' => 'submit',
                'class' => 'btn lz-btn-outline-danger text-capitalize',
                'onclick' => "return confirm('Are you sure?')"]) !!}
                {!! Form::close() !!}
                    
                </td>
            </tr>
        </tbody>
        @endforeach
        
    </table>
    <div class="pagination" >
        {{$role->appends(Request::except('page'))->links()}}
    </div>
    </div>
</section>
@endsection