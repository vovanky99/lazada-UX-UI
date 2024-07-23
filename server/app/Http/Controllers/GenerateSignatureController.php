<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Cloudinary\Api\ApiUtils;
use Illuminate\Http\Request;
use Cloudinary\Configuration\Configuration;

class GenerateSignatureController extends Controller{
    public function Cloudinary(Request $request){
         // Configure Cloudinary
        Configuration::instance([
            'cloud'=>[
                'cloud_name' => config('services.cloudinary.cloud_name'),
                'api_key' => config('services.cloudinary.api_key'),
                'api_secret' => config('services.cloudinary.api_secret'),
            ],
            'url' => [
                'secure' => true
            ]
            ]);
        // Get all parameters to sign from the request
        $params_to_sign = $request->all();
        
        $params_to_sign['timestamp'] = time();// Ensure timestamp is included

         // Generate the signature
        $signature = ApiUtils::signParameters($params_to_sign,config('services.cloudinary.api_secret'));

        // Return signature and timestamp
        return response()->json(['signature' => $signature,
            'timestamp' => $params_to_sign['timestamp']]);
    }
}