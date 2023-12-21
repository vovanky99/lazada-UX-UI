<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LAZADA ADMIN</title> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        @vite('resources/css/home.css')
        @vite('resources/css/app.css')
        
</head>

<body>
    <header id="header" class="row flex">
        <nav class="header-nav m-auto navbar flex-row d-flex fixed-top col-12">
            <div class="navbar-brand-wrapper text-center d-flex align-items-center justify-content-center">
                <a href="#" class="brand-logo">
                    <img src="{{asset('upload/images/logo/logo.png')}}" alt="logo">
                </a>
            </div>
            <div class="navbar-menu-wrapper d-flex">
                <button class="lz-menu navbar-toggler" >
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div class="search-field d-none d-md-block">
                    <form class="d-flex align-items-center h-100" action="#">
                      <div class="input-group flex-row align-items-center">
                        <div class="input-group-prepend bg-transparent">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input type="text" class="form-control bg-transparent border-0" placeholder="Search projects">
                      </div>
                    </form>
                  </div>
                <ul class="header-nav-left navbar-nav d-flex flex-row ms-auto">
                    <li class="profile nav-item dropdown flex-row">
                        <a href="#" class="navlink flex-row text-decoration-none" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" >
                            <div class="nav-profile-img">
                                <img class="rounded-circle" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="">
                                <span class="availability-status online"></span>
                            </div>
                            <div class="nav-profile-text d-flex flex-row"> 
                                <p class="text-black text-capitalize">
                                    David Greymaax
                                </p>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-user"></i>profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-lock"></i>change password</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-right-from-bracket"></i>signout</a></li>
                        </ul>
                    </li>
                    <li class="lz-messenger nav-item dropdown flex-row">
                        <a href="#" class="navlink flex-row" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" >
                            <i class="fa-regular fa-envelope"></i>
                            <span class="count-symbol bg-warning"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                            <h6 class="lz-mesenger-title p-3 mb-0 fw-bold">Messages</h6>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <img class="rounded-circle" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="logo">
                                    <div class="lz-mesenger-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                        <p class="text-gray mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <img class="rounded-circle" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="logo">
                                    <div class="lz-mesenger-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                        <p class="text-gray mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <img class="rounded-circle" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="logo">
                                    <div class="lz-mesenger-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                        <p class="text-gray mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                            </li>
                            <h6 class="p-3 mb-0 text-center fs-4 fw-bold">4 new messages</h6>
                        </ul>
                    </li>
                    <li class="lz-bell nav-item dropdown flex-row">
                        <a href="#" class="navlink flex-row" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" >
                            <i class="fa-solid fa-bell"></i>
                            <span class="count-symbol bg-danger"></span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                            <h6 class="lz-mesenger-title p-3 mb-0 fs-4 fw-bold">Notifications</h6>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-calendar-day fs-3"></i>
                                    <div class="lz-mesenger-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                        <p class="text-gray mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-gear fs-3"></i>
                                    <div class="lz-mesenger-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                        <p class="text-gray mb-0">  Just a reminder that you have an event today  </p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="fa-solid fa-link fs-3"></i>
                                    <div class="lz-mesenger-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                                        <p class="text-gray mb-0"> 1 Minutes ago </p>
                                    </div>
                                </a>
                            </li>
                            <h6 class="p-3 mb-0 text-center fs-4 fw-bold">See all notifications</h6>
                        </ul>
                    </li>
                    
                    
                </ul>
            </div>

        </nav>
    </header>
    <main id="main" class="row m-0">

        <nav id="sidebar">

        </nav>
        @yield('main_content')
    </main>
    @vite('resources/js/main.js')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
</body>

</html>