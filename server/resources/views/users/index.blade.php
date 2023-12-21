@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    {!! Form::open(['method'=>'GET','route'=>['users.create']]) !!}
        <button type="submit" class="btn btn-primary">create</button>
        @csrf
    {!! Form::close() !!}
    @if (session()->has('delete'))
        {   <span class="text-success">{{{ $delete }}}</span> }
    @endif
  
    <table class="table table-bordered border-primary">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">avatar</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">phone number</th>
                <th scope="col">decentralization</th>
                <th scope="col">status</th>
                <th scope="col">tools</th>
            </tr>
        </thead>

        <?php $i=1;  ?>
        @foreach($users as $user)
        <tbody>
            <tr>
                <th><?php echo $i++ ?></th>
                <td><?php echo $user->name ?></td>
                <td>
                    <img src="{{asset('upload/images')}}/{{$user->avatar}}" />
                </td>
                <td><?php echo $user->username ?></td>
                <td><?php echo $user->email ?></td>
                <td><?php echo $user->phone_number ?></td>
                <td><?php echo $user->decentralization->name ?></td>
                <td><?php echo $user->status ?></td>
                <td>

                {!! Form::open(['method'=>'GET','route'=>['users.show',$user->id]]) !!}
                @csrf
                    <button type="submit" class="btn btn-primary">show</button>
                {!! Form::close() !!}
                {!! Form::open(['method'=>'DELETE','route'=>['users.destroy',$user->id]]) !!}
                @csrf
                {!! Form::button('delete',['type' => 'submit',
                'class' => 'btn btn-danger',
                'onclick' => "return confirm('Are you sure?')"]) !!}
                {!! Form::close() !!}
                    
                </td>
            </tr>
        </tbody>
        @endforeach
        <div class="pagination" >
         {{$users->links()}}
        </div>
    </table>
</section>
@endsection