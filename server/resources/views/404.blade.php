<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LZ ADMIN</title> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        @vite('resources/css/home.css')
        @vite('resources/css/app.css')
        
</head>

<body>

    <div class="container-fluid lz-body-404"  >
        <div class="content-wrapper d-flex align-items-center text-center error-page ">
            <div class="row flex-gow lz-error">
                <div class="col-lg-7 mx-auto">
                    <div class="row align-items-center d-flex flex-row">
                        <div class="col-6 px-20">
                            <h1 class="mb-0 text-white fs-120">404</h1>
                        </div>
                        <div class="col-6 px-20 flex-column text-start">
                            <h2 class="text-white fs-30">
                                SORRY!
                            </h2>
                            <h3 class="text-white fs-22 fw-light">
                                The page you’re looking for was not found.
                            </h3>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <a href="/" class="text-white text-decoration-none fs-3" >Back to home</a>
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