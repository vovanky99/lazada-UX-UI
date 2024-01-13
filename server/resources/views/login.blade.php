<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LZ ADMIN</title> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        @vite('resources/css/styles.css')
        @vite('resources/css/home.css')
        @vite('resources/css/app.css')
        
</head>

<body>

    <div class="container-fluid lz-body-login"  >
        <div class="content-wrapper bg-gray">
            <div class="row flex-grow">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-container bg-white p-5 ">
                        <div class="brand-logo mb-32">
                            <img src="{{asset('upload/images/logo/logo.svg')}}" alt="">
                        </div>
                        <h4 class="mb-3 fw-bold lt-sp-1 fs-3">
                            Hello! let's get started
                        </h4>
                        <h6 class="mb-4 fs-4 fw-light">
                            Sign in to continue.
                        </h6>

                        {!! Form::open(['method'=>'get','route'=>['getlogin']],['class'=>'pt-3','accept-charset'=>"UTF-8"]) !!}
                        @csrf
                        <div class="form-group">
                            @error('username')
                                <div class="alert alert-danger"> {{$message}} </div>
                            @enderror
                            {!! Form::text('username','',['class' => 'form-control p-3 form-control-lg lz-login-username mb-5','placeholder'=>'Username']) !!}
                            
                        </div>
                        
                        <div class="form-group">
                            @error('password')
                                <div class="alert alert-danger"> {{$message}} </div>
                            @enderror
                            {!! Form::password('password',['class' => 'form-control p-3 form-control-lg lz-login-password mb-5','placeholder'=>'Password']) !!}
                            
                        </div>
                        @if (session()->has('error'))
                        <div class="alert alert-success text-center fs-5 text-capitalize">
                            {{ session()->get('error') }}
                        </div>
                        @endif
                        
                        <div class="form-group mb-4">
                            {!! Form::submit('Sign in',['class' => 'form-control form-control-lg lz-login-submit py-4 text-white text-uppercase fw-bold mb-5 bg-gradient-primary']) !!}
                        </div>
                        <div class="my-2 mb-5 d-flex justify-content-between align-items-center">
                            <div class="form-check">
                                <label class="form-check-label text-muted fs-4 lz-checkbox-login">
                                <input name="remember" type="checkbox" class="form-check-input  lz-border-primary"> keep singin login
                                <i class="input-helper"></i></label>
                            </div>
                            <a href="#" class="lz-forgot-pass auth-link text-black fs-4 text-decoration-none text-black">Forgot password?</a>
                        </div>
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
    @vite('resources/js/main.js')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
</body>

</html>