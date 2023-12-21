@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    {!! Form::open(['method'=>'GET','route'=>['dt.create']]) !!}
        <button type="submit" class="btn btn-primary">create</button>
        @csrf
    {!! Form::close() !!}

  
    <table class="table table-bordered border-primary">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col">tools</th>
            </tr>
        </thead>

        <?php $i=1;  ?>
        @foreach($decentralization as $dt)
        <tbody>
            <tr>
                <th><?php echo $i++ ?></th>
                <td><?php echo $dt->name ?></td>
                <td><?php echo $dt->description ?></td>
                <td>

                {!! Form::open(['method'=>'GET','route'=>['dt.show',$dt->id]]) !!}
                @csrf
                    <button type="submit" class="btn btn-primary">show</button>
                {!! Form::close() !!}
                {!! Form::open(['method'=>'DELETE','route'=>['dt.destroy',$dt->id]]) !!}
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
         {{$decentralization->links()}}
        </div>
    </table>
</section>
@endsection