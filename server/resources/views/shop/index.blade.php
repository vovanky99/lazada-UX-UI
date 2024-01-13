@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['shop.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('shop','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create shop</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_shop ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['shop.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search Shop',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {{-- {!! Form::close() !!} --}}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            {{-- {!! Form::open(['method'=>'GET','route'=>['users.search']]) !!} --}}
            @csrf
            <select name="search_users" class="px-2 py-2 lz-border-secondary outline-none ">
                <option value="0" >null</option>
                @foreach ($users as $user)
                <option value="<?php echo $user->id ?>" <?php 
                if(!empty($selected_users) && $selected_users==$user->id ){ ?> selected <?php } 
                ?> ><?php echo $user->name ?></option>
                @endforeach
            </select>
            <div class="text-success">
                @if (session()->has('success'))
                {{ session()->get('success') }}
                @endif
            </div>
            {!! Form::submit('Change',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th scope="col">name</th>
                    <th scope="col">logo</th>
                    <th scope="col">descriptions</th>
                    <th scope="col">address</th>
                    <th scope="col">Owner</th>
                    <th scope="col">tool</th>
                </tr>
            </thead>

            @foreach($shop as $s)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td><?php echo $s->name ?></td>
                    <td>
                        <img class="img" src="{{asset('upload/images/shop/logo')}}/{{$s->logo}}" />
                    </td>
                    <td><?php echo $s->descriptions ?></td>
                    <td><?php echo $s->address ?></td>
                    <td><?php echo $s->users->name ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['shop.show',$s->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['shop.destroy',$s->id]]) !!}
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
                    {{$shop->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection