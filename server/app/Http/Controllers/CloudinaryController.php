<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\GeneralRepository;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary as FacadesCloudinary;
use Exception;
use Illuminate\Http\Request;

class CloudinaryController extends Controller
{
    protected $general ;
    public function __construct(GeneralRepository $general)
    {
        $this->general = $general;
    }
   public function generateSignature(Request $request){
    $timestamp = time();
    if($request->get('type') == 'video'){
        $params = [
            'timestamp' => $timestamp,
            'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET_VIDEO'),
            // 'return_delete_token' => true
        ];
    }
    else{
        $params = [
            'timestamp' => $timestamp,
            'upload_preset' => env('CLOUDINARY_UPLOAD_PRESET_IMAGE'),
            // 'return_delete_token' => true
        ];
    }

    
   
    $signature = $this->signParams($params, env('CLOUDINARY_API_SECRET'));
    return response()->json([ 
        'signature' => $signature,
        'timestamp' => $timestamp,
    ]);
   }
   private function signParams($params){
    ksort($params);
    $to_sign = [];
    foreach($params as $key =>$value){
        $to_sign[] = $key . '='.$value;
    }
    $to_sign = implode('&',$to_sign);
    $api_secret = env('CLOUDINARY_API_SECRET');
    return sha1($to_sign . $api_secret);
   }
   
   public function deleteImage(Request $request){
    $url = $request->url;
    try{
        if($url){
            $publicId = $this->general->extractPulbicIdFormUrl($url);
        }
        else{
            $publicId = $request->public_id;
        }
        FacadesCloudinary::destroy($publicId);
        return response()->json(['success' => 'Image deleted successfully']);
    }
    catch(Exception $e){
        return response()->json(['error' => $e->getMessage()], 500);
    }
   }
}