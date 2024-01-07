@extends('header')

@section('main_content')
<section id="main-content">
   <div class="content-wrapper">
    <div class="page-header d-flex justify-content-between align-items-center">
        <h3 class="page-title"><span class="page-title-icon"><i class="fa-solid fa-house"></i></span>Dashboard</h3>
        <nav aria-label="breadcrumb">
            <ul class="breadcrumb ">
              <li class="breadcrumb-item active fs-5 align-items-center pt-2" aria-current="page">
                <span></span>Overview
                <i class="fa-solid fa-circle-exclamation"></i>
              </li>
            </ul>
        </nav>
    </div>
    <div class="row chart-table">
        <div class="col-md-4 px-20 ">
            <div class="card bg-gradient-danger card-img-holder border-0 rounded-10 ">
                <div class="card-body p-40">
                    <h4 class="fw-normal d-flex mb-3 justify-content-between text-white fs-18">
                        Weekly Sales 
                        <i class="fa-solid fa-chart-line text-white"></i>
                    </h4>
                    <h2 class="mb-5 text-white fs-35">
                        15,000
                    </h2>
                    <h6 class="card-text text-white fs-16">Increased by 60%</h6>
                </div>
            </div>
        </div>
        <div class="col-md-4 px-20 ">
            <div class="card bg-gradient-info card-img-holder border-0 rounded-10">
                <div class="card-body p-40">
                    <h4 class="fw-normal d-flex mb-3 justify-content-between text-white fs-18">
                        Weekly Sales 
                        <i class="fa-regular fa-bookmark text-white"></i>
                    </h4>
                    <h2 class="mb-5 text-white fs-35" >
                        15,000
                    </h2>
                    <h6 class="card-text text-white fs-16">Increased by 60%</h6>
                </div>
            </div>
        </div>
        <div class="col-md-4 px-20 ">
            <div class="card bg-gradient-success card-img-holder border-0 rounded-10">
                <div class="card-body p-40">
                    <h4 class="fw-normal d-flex mb-3 justify-content-between text-white fs-18">
                        Weekly Sales 
                        <i class="fa-regular fa-gem text-white"></i>
                    </h4>
                    <h2 class="mb-5 text-white fs-35">
                        15,000
                    </h2>
                    <h6 class="card-text text-white fs-16">Increased by 60%</h6>
                </div>
            </div>
        </div>
    </div>
    <div class="row chart-table">
        <div class="col-md-7">
            <div class="card border-0 rounded-10">
                <div class="card-body p-40">
                    <div class="d-flex">
                        <h4 class="card-title">
                            Visit And Sales Statistics
                        </h4>
                        <div id="sales-chart-legend" class="rounded">
                            <ul>

                            </ul>
                        </div>
                    </div>
                    <canvas id="canvas" height="350" width="470" aria-label="Hello ARIA World" class="mt-4 chartjs-render-monitor">
                        
                    </canvas>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="card border-0 rounded-10">
                <div class="card-body p-40">
                    <div class="d-flex">
                        <h4 class="card-title">
                            Traffic Sources
                        </h4>
                        <div id="sales-chart-legend" class="rounded">
                            <ul>

                            </ul>
                        </div>
                    </div>
                    <canvas id="traffic" height="350" width="200" aria-label="Hello ARIA World" class="mt-4 chartjs-render-monitor">
                        
                    </canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="row chart-table">
        <div class="col-12">
            <div class="card">
                <div class="card-body p-40">
                    <h4 class="card-title">
                        order status
                    </h4>
                    <div class="tables-responsive">
                        <table class="table" >
                            <thead>
                                <tr class="text-capitalize">
                                    <th class="p-15">Orderer</th>
                                    <th class="p-15">Subject</th>
                                    <th class="p-15">Status</th>
                                    <th class="p-15">last update</th>
                                    <th class="p-15">Order ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="p-15">
                                        <img class="rounded-circle wh-35" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="">
                                        <span class="ms-1 fs-5 ">David Grey</span>
                                    </td>
                                    <td class="p-15 fs-5">Fund is not recieved</td>
                                    <td class="p-15 fs-5">
                                        <label class="lz-py-6 lz-px-9 text-uppercase text-white rounded-pill bg-gradient-success">DONE</label>
                                    </td>
                                    <td class="p-15 fs-5">  Dec 5, 2017 </td>
                                    <td class="p-15 fs-5"> WD-12345 </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <img class="rounded-circle wh-35" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="">
                                        <span class="ms-1 fs-5 ">David Grey</span>
                                    </td>
                                    <td class="p-15 fs-5">Fund is not recieved</td>
                                    <td class="p-15 fs-5">
                                        <label class="lz-py-6 lz-px-9 text-uppercase text-white rounded-pill bg-gradient-success">DONE</label>
                                    </td>
                                    <td class="p-15 fs-5">  Dec 5, 2017 </td>
                                    <td class="p-15 fs-5"> WD-12345 </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <img class="rounded-circle wh-35" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="">
                                        <span class="ms-1 fs-5 ">David Grey</span>
                                    </td>
                                    <td class="p-15 fs-5">Fund is not recieved</td>
                                    <td class="p-15 fs-5">
                                        <label class="lz-py-6 lz-px-9 text-uppercase text-white rounded-pill bg-gradient-success">DONE</label>
                                    </td>
                                    <td class="p-15 fs-5">  Dec 5, 2017 </td>
                                    <td class="p-15 fs-5"> WD-12345 </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <img class="rounded-circle wh-35" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="">
                                        <span class="ms-1 fs-5 ">David Grey</span>
                                    </td>
                                    <td class="p-15 fs-5">Fund is not recieved</td>
                                    <td class="p-15 fs-5">
                                        <label class="lz-py-6 lz-px-9 text-uppercase text-white rounded-pill bg-gradient-success">DONE</label>
                                    </td>
                                    <td class="p-15 fs-5">  Dec 5, 2017 </td>
                                    <td class="p-15 fs-5"> WD-12345 </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <img class="rounded-circle wh-35" src="{{asset('upload/images/avatar/face1.jpg')}}" alt="">
                                        <span class="ms-1 fs-5 ">David Grey</span>
                                    </td>
                                    <td class="p-15 fs-5">Fund is not recieved</td>
                                    <td class="p-15 fs-5">
                                        <label class="lz-py-6 lz-px-9 text-uppercase text-white rounded-pill bg-gradient-success">DONE</label>
                                    </td>
                                    <td class="p-15 fs-5">  Dec 5, 2017 </td>
                                    <td class="p-15 fs-5"> WD-12345 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
</section>
@endsection