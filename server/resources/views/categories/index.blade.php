@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    {!! Form::open(['method'=>'GET','route'=>['cat.create']]) !!}
        <button type="submit" class="btn btn-primary">create</button>
        @csrf
    {!! Form::close() !!}

  
    <table class="table table-bordered border-primary">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">title</th>
                <th scope="col">parent_id</th>
                <th scope="col">tools</th>
            </tr>
        </thead>

        <?php $i=1;  ?>
        @foreach($categories as $cat)
        <tbody>
            <tr>
                <th><?php echo $i++ ?></th>
                <td><?php echo $cat->title ?></td>
                <td><?php echo $cat->parent_id ?></td>
                <td>

                {!! Form::open(['method'=>'GET','route'=>['cat.show',$cat->id]]) !!}
                @csrf
                    <button type="submit" class="btn btn-primary">show</button>
                {!! Form::close() !!}
                {!! Form::open(['method'=>'DELETE','route'=>['cat.destroy',$cat->id]]) !!}
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
         {{$categories->links()}}
        </div>
    </table>
</section>
@endsection