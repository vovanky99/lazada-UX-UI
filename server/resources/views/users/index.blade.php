@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['users.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('users','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary px-5 py-2 text-capitalize">Create Users</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_users ?>)</span>
            <div class="search-user">
                {!! Form::open(['method'=>'GET','route'=>['users.search']]) !!}
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search Users',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

                {{-- {!! Form::close() !!} --}}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            {{-- {!! Form::open(['method'=>'GET','route'=>['users.search']]) !!} --}}
            @csrf
            <select name="search_users" class="px-2 py-2 lz-border-secondary outline-none ">
                <option value="0" selected>null</option>
                @foreach ($decentralization as $role)
                <option value="<?php echo $role->id ?>"><?php echo $role->name ?></option>
                @endforeach
            </select>
            {!! Form::submit('Change',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}

            {!! Form::close() !!}
        </div>
    
        <table class="table table-bordered lz-border-secondary">
            <thead class="bg-white">
                <tr class="fs-4 text-capitalize">
                    <th scope="col">name</th>
                    <th scope="col">avatar</th>
                    <th scope="col">username</th>
                    <th scope="col">email</th>
                    <th scope="col">Role</th>
                    <th scope="col">status</th>
                    <th scope="col">tools</th>
                </tr>
            </thead>

            @foreach($users as $user)
            <tbody class="bg-light">
                <tr class="fs-5 h-50">
                    <td><?php echo $user->name ?></td>
                    <td>
                        <img class="img" src="{{asset('upload/images')}}/{{$user->avatar}}" />
                    </td>
                    <td><?php echo $user->username ?></td>
                    <td><?php echo $user->email ?></td>
                    <td><?php echo $user->decentralization->name ?></td>
                    <td><?php echo $user->status ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['users.show',$user->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['users.destroy',$user->id]]) !!}
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
                    {{$users->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection