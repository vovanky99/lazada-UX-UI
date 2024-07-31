<?php 

namespace App\Repositories;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
use Illuminate\Http\Request;

class GeneralRepository {
    public function create(Request $request){

    }
    public function extractPulbicIdFormUrl($url){
        $patern = '/\/v[0-9]+\/([^\.]+)/';
        preg_match($patern,$url,$match);
        return $match[1] ?? null;
    }
    public function deleteImagesCloudinary($url){
        try{
            $publicId = $this->extractPulbicIdFormUrl($url);
            Cloudinary::destroy($publicId);
            return true;
        }
        catch(Exception $e){
            return false;
        }
    }
}