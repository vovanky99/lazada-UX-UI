@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['mft.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('Manuf','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create Manuf</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_mft ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['mft.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {{-- {!! Form::close() !!} --}}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            {{-- {!! Form::open(['method'=>'GET','route'=>['users.search']]) !!} --}}
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
                    <th scope="col">logo</th>
                    <th scope="col">descriptions</th>
                    <th scope="col">tool</th>
                </tr>
            </thead>

            @foreach($mft as $m)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td><?php echo $m->name ?></td>
                    <td>
                        <img class="img" src="{{asset('upload/images/manuf')}}/{{$m->logo}}" />
                    </td>
                    <td><?php echo $m->descriptions ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['mft.show',$m->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['mft.destroy',$m->id]]) !!}
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
                    {{$mft->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection