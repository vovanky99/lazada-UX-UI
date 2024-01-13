@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['pd_type.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('products type','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary fs-5 px-4 py-2 text-capitalize">Create products type</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_pd_type ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['pd_type.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {!! Form::close() !!}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            @csrf
            <div class="text-success">
                @if (session()->has('success'))
                {{ session()->get('success') }}
                @endif
            </div>
            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th scope="col">name</th>
                    <th scope="col">descriptions</th>
                    <th scope="col">tool</th>
                </tr>
            </thead>

            @foreach($pd_type as $pd)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td><?php echo $pd->title ?></td>
                    <td><?php echo $pd->descriptions ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['pd_type.show',$pd->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['pd_type.destroy',$pd->id]]) !!}
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
                    {{-- {!! Form::open(['method'=>'GET','route'=>['users.search']]) !!}
                    @csrf
                    <select name="search_role" class="px-2 py-2 lz-border-secondary outline-none ">
                        <option value="0" selected>null</option>
                        @foreach ($decentralization as $role)
                        <option value="{{echo $role->id }}"> {{echo $role->name}}</option>
                        @endforeach
                    </select>
                    {!! Form::submit('Change',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}
        
                    {!! Form::close() !!} --}}
                </div>
            </div>
            <div class="col-6">
                <div class="pagination" >
                    {{$pd_type->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection