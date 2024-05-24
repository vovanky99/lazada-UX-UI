<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\District;
use App\Models\Ward;
use Illuminate\Http\Request;

class LocationController extends Controller {

     // get location for datatable
     public function index(Request $request){
        $country_id = $request->get('country_id');
        $city_id = $request->get('city_id');
        $district_id = $request->get('district_id');
        if($country_id && $city_id && $district_id){
            $countries = Country::where('country.id',$country_id)->with(['cities'=>function($query) use ($city_id,$district_id){
                $query->where('id',$city_id)->with(['districts'=>function($query) use ($district_id){
                    $query->where('id',$district_id)->with('wards');
                }]);
            }])->orderBy('name','asc')->get();      
        }
        else if($country_id && $city_id ){
            $countries = Country::where('country.id',$country_id)->with(['cities'=>function($query) use ($city_id){
                $query->where('id',$city_id)->with('districts.wards');
            }])->orderBy('name','asc')->get();        
        }
        else if($country_id){
            $countries = Country::with('cities.districts.wards')->where('country.id',$country_id)->orderBy('name','asc')->get();  
        }
        else{
            $countries = Country::with('cities.districts.wards')->orderBy('name','asc')->get();  
        }
        return response()->json($countries);
    }
    public function createCountry(Request $request){
        $name = $request->name;
        $country = Country::where('name',$name)->first();
        if($country){
            return response()->json(['error'=>'Country Existed!']);
        }
        else{
            Country::create([
                'name'=>$name,
            ]);
            return response()->json(['success'=>'Create Success!']);
        }
    }
    public function createCity(Request $request){
        $name = $request->name;
        $country_id = $request->country_id;
        $city = City::where('country_id',$country_id)->where('name',$name)->first();
        if($city){
            return response()->json(['error'=>'City of Country Existed!']);
        }
        else{
            City::create([
                'name'=>$name,
                'country_id'=>$country_id,
            ]);
            return response()->json(['success'=>'Create Success!']);
        }
        
    }
    public function createDistrict(Request $request){
        $name = $request->name;
        $city_id = $request->city_id;
        $fee_ship = $request->fee_ship;
        $district = District::where('city_id',$city_id)->where('name',$name)->first();
        if($district){
            return response()->json(['error'=>'District of City Existed!']);
        }
        else{
            District::create([
                'name'=>$name,
                'fee_ship'=>$fee_ship,
                'city_id'=>$city_id,
            ]);
            return response()->json(['success'=>'Create Success!']);
        }
        
    }
    public function createWard(Request $request){
        $name = $request->name;
        $district_id = $request->district_id;
        $ward = Ward::where('district_id',$district_id)->where('name',$name)->first();
        if($ward){
            return response()->json(['error'=>'District of City Existed!']);
        }
        else{
            Ward::create([
                'name'=>$name,
                'district_id'=>$district_id,
            ]);
            return response()->json(['success'=>'Create Success!']);
        }
        
    }
    public function createAddress(Request $request){
        
    }
    public function getCountry(Request $request){
        $name = $request->get('name');
        $country = Country::where('name','like',$name.'%')->orderBy('name','ASC')->get();
        return response()->json($country);
    }
    public function getCity(Request $request){
        $name = $request->get('name');
        $country_id = $request->get('foreign_id');
        $city = City::where('name','like',$name.'%')->where('country_id',$country_id)->orderBy('name','ASC')->get();
        return response()->json($city);
    }
    public function getDistrict(Request $request){
        $name = $request->get('name');
        $city_id = $request->get('foreign_id');
        $district = District::where('name','like',$name.'%')->where('city_id',$city_id)->orderBy('name','ASC')->get();
        return response()->json($district);
    }
    public function getWard(Request $request){
        $name = $request->get('name');
        $district_id = $request->get('foreign_id');
        $ward = Ward::where('name','like',$name.'%')->where('district_id',$district_id)->orderBy('name','ASC')->get();
        return response()->json($ward);
    }
    public function getAddress(Request $request){
        
    }

   

    public function deleteLocation($type,$id){
        if($type=='ward'){
            Ward::where('id',$id)->delete();
        }
        else if ($type == 'district'){
            District::where('id',$id)->delete();
        }
        else if($type == 'city'){
            City::where('id',$id)->delete();
        }
        else{
            Country::where('id',$id)->delete();
        }
        return response()->json(['success'=>"Delete $type success"]);
    }
    public function deleteCountry($id){
        Country::where('id',$id)->delete();
        return response()->json(['success'=>"Delete Country Success"]);
    }
    public function deleteCity($id){
        City::where('id',$id)->delete();
        return response()->json(['success'=>"Delete City Success"]);
    }
    public function deleteDistrict($id){
        District::where('id',$id)->delete();
        return response()->json(['success'=>"Delete District Success"]);
    }
    public function deleteWard($id){
        Ward::where('id',$id)->delete();
        return response()->json(['success'=>"Delete Ward Success"]);
    }
    public function editCountry(Request $request,$id){
        $name = $request->name;
        $ward = Country::where('id',$id)->first();
        $ward->name = $name;
        return response()->json(['success'=>"Edit Country Success"]);
    }
    public function editCity(Request $request,$id){
        $name = $request->name;
        $ward = City::where('id',$id)->first();
        $ward->name = $name;
        return response()->json(['success'=>"Edit City Success"]);
    }
    public function editDistrict(Request $request,$id){
        $name = $request->name;
        $ward = District::where('id',$id)->first();
        $ward->name = $name;
        return response()->json(['success'=>"Edit District Success"]);
    }
    public function editWard(Request $request,$id){
        $name = $request->name;
        $ward = Ward::where('id',$id)->first();
        $ward->name = $name;
        return response()->json(['success'=>"Edit Ward Success"]);
    }
}