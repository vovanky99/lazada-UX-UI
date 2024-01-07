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
    <header id="header" class="row flex">
        <nav class="header-nav m-auto navbar flex-row d-flex fixed-top col-12">
            <div class="navbar-brand-wrapper text-center d-flex align-items-center justify-content-center">
                <a href="/" class="brand-logo">
                    <img src="{{asset('upload/images/logo/logo.svg')}}" alt="logo">
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
                    <li class="profile nav-item dropdown">
                        <a href="#" class="navlink flex-row text-decoration-none" type="button" id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" >
                            <div class="nav-profile-img">
                                <img class="rounded-circle" src="{{asset('upload/images')}}/<?php 
                                    echo Auth()->user()->avatar; ?>" alt="">
                                <span class="availability-status online"></span>
                            </div>
                            <div class="nav-profile-text d-flex flex-row"> 
                                <p class="text-black text-capitalize">
                                    <?php 
                                        echo auth()->user()->name ;
                                        ?>
                                </p>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-user"></i>profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-lock"></i>change password</a></li>
                            <li><a class="dropdown-item" href="{{route('logout')}}"><i class="fa-solid fa-right-from-bracket"></i>signout</a></li>
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
            <ul class="nav d-flex flex-column" id="myTab" role="tablist">
                <li class="nav-item nav-profile">
                    <a href="#" class="nav-link d-flex align-items-center justify-content-between">
                        <div class="nav-profile-img">
                            <img class="rounded-circle" src="{{asset('upload/images')}}/<?php
                               echo  auth()->user()->avatar;
                                ?>" alt="">
                        </div>
                        <div class="nav-profile-text d-flex flex-column">
                            <span class="fw-bold mb-1 fs-4 "><?php  
                                echo auth()->user()->name;
                                 ?></span>
                            <span class="nav-profile-positions text-secondary text-small fs-5 fw-normal"><?php 
                            echo auth()->user()->decentralization->name;  
                            ?></span>
                        </div>
                        <i class="fa-solid fa-square-check"></i>
                    </a>
                </li>
                <li class="nav-item active py-4">
                    <a href="/" class="nav-link d-flex justify-content-between">
                        <span class="menu-title fs-4 text-capitalize">dashboard</span>
                        <i class="fa-solid fa-house"></i>
                    </a>
                </li>
                <li class="nav-item dropdown py-4">
                    <a href="#sidebar-toggle" class="nav-link d-flex justify-content-between" data-bs-toggle="collapse">
                        <span class="menu-title fs-4 text-capitalize" >tables DB</span>
                        <div>
                            <i class="fa-solid fa-angle-down me-3"></i>
                            <i class="fa-solid fa-table-cells"></i>
                        </div>
                    </a>
                    <ul class="collapse sidebar-toggle" id="sidebar-toggle">
                        <li ><a href="/users" class="dropdown-item">Users</a></li>
                        <li ><a href="/cat" class="dropdown-item">Categories</a></li>
                        <li ><a href="/dt" class="dropdown-item">Decentralization</a></li>
                        <li ><a href="/blogs" class="dropdown-item">Blogs</a></li>
                        <li ><a href="/mft" class="dropdown-item">manufacturer</a></li>
                        <li ><a href="/products" class="dropdown-item">products</a></li>
                        <li ><a href="/reviews" class="dropdown-item">reviews</a></li>
                        <li ><a href="/shop" class="dropdown-item">shop</a></li>
                        <li ><a href="/slide" class="dropdown-item">slide</a></li>
                        <li ><a href="/voucher" class="dropdown-item">voucher</a></li>
                        <li ><a href="/pd_type" class="dropdown-item">products_type</a></li>
                        <li ><a href="/pd_type" class="dropdown-item">payment_method</a></li>

                    </ul>
                </li>
                <li class="nav-item py-4">
                    <a href="#" class="nav-link justify-content-between d-flex">
                        <span class="menu-title fs-4 text-capitalize">table charts</span>
                        <i class="fa-solid fa-chart-line"></i>
                    </a>
                </li>
                <li class="nav-item py-4">
                    <a href="#" class="nav-link justify-content-between d-flex">
                        <span class="menu-title fs-4 text-capitalize">forms</span>
                        <i class="fa-solid fa-list"></i>
                    </a>
                </li>
            </ul>
        </nav>
        @yield('main_content')
    </main>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    {{-- chart.js  --}}
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    @vite('resources/js/main.js')
</body>

</html>