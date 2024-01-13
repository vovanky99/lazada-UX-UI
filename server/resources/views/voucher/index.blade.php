@extends('header')

@section('main_content')
<section id="main-content" class="col-10">
    <div class="content-wrapper">
        <div class="mb-5 align-items-center d-flex">
        {!! Form::open(['method'=>'GET','route'=>['voucher.create'],'class'=>'d-flex align-items-center']) !!}
            {!! Form::label('voucher','',['class'=>'me-2 text-capitalize fs-22']) !!}
            <button type="submit" class="btn lz-btn-outline-primary fs-5 px-4 py-2 text-capitalize">Create voucher</button>
            @csrf
        {!! Form::close() !!}
        </div>
        <div class="mb-3 align-items-center d-flex justify-content-between">
            <span class="fs-4">All(<?php echo $count_voucher ?>)</span>
            {!! Form::open(['method'=>'GET','route'=>['voucher.search']]) !!}
            <div class="search-user">
                @csrf
                {!! Form::text('search','',['class'=>'px-2 py-2 lz-border-secondary search-users']) !!}
                {!! Form::submit('Search',['class'=>' lz-btn-outline-primary px-5 py-2 text-capitalize']) !!}

                {{-- {!! Form::close() !!} --}}
            </div>
        </div>
        <div class="mb-3 align-items-center d-flex">
            @csrf
            <select name="search_cat" class=" fs-5  px-2 py-2 lz-border-secondary outline-none me-3">
                <option value="0">Categories</option>
                @foreach ($cat as $c)
                <option value="<?php echo $c->id ?>"  @if (!empty($selected_cat) && $selected_cat == $c->id)
                    selected
                @endif><?php echo $c->title ?></option>
                @endforeach
            </select>
            <select name="search_pd_type" class=" fs-5 px-2 py-2 lz-border-secondary outline-none me-3">
                <option value="0">Products Type</option>
                @foreach ($pd_type as $pd)
                <option value="<?php echo $pd->id ?>" @if (!empty($selected_pd_type) && $selected_pd_type == $pd->id)
                    selected
                @endif><?php echo $pd->title ?></option>
                @endforeach
            </select>
            {!! Form::submit('Change',['class'=>' lz-btn-outline-primary px-5 py-2']) !!}
            {!! Form::close() !!}
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
                    <th scope="col">code</th>
                    <th scope="col">percents</th>
                    <th scope="col">quantity</th>
                    <th scope="col">cat</th>
                    <th scope="col">products type</th>
                    <th scope="col">tool</th>
                </tr>
            </thead>

            @foreach($voucher as $v)
            <tbody class="bg-light">
                <tr class="fs-5 h-50" >
                    <td><?php echo $v->title ?></td>
                    <td class="text-truncate max-width-300"><?php echo $v->descriptions ?></td>
                    <td><?php echo $v->code ?></td>
                    <td><?php echo $v->percents ?>%</td>
                    <td><?php echo $v->quantity ?></td>
                    <td><?php echo $v->categories->title??'' ?></td>
                    <td><?php echo $v->productsType->title??'' ?></td>
                    <td >
                        <div class="d-flex flex-row gap-2 justify-content-center">
    
                            {!! Form::open(['method'=>'GET','route'=>['voucher.show',$v->id]]) !!}
                            @csrf
                                <button type="submit" class="btn lz-btn-outline-primary text-capitalize">show</button>
                            {!! Form::close() !!}
                            {!! Form::open(['method'=>'DELETE','route'=>['voucher.destroy',$v->id]]) !!}
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
                    {{$voucher->appends(Request::except('page'))->links()}}
                </div>
            </div>
        </div>
        
    </div>
</section>
@endsection