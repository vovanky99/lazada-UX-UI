<?php 

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\District;
use App\Models\Languages;
use App\Models\Ward;
use Exception;
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
            $lang = Languages::where('name',$request->language)->first();
            if($lang){
                $langId= $lang->id;
            }
            else{
                if($request->language){
                    $langId = Languages::create([
                        'name'=>$request->language,
                        'acronym'=>$request->acronym,
                    ])->id;
                }
                else{
                    $langId = Languages::create([
                        'name'=>$request->name,
                        'acronym'=>$request->acronym,
                    ])->id;
                }
                
            }
            Country::create([
                'name'=>$request->name,
                'acronym'=>$request->acronym,
                'international_codes'=>$request->international_codes,
                'language_id'=>$langId
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
            City::create($request->all());
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
            District::create($request->all());
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
            Ward::create($request->all());
            return response()->json(['success'=>'Create Success!']);
        }
        
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
        $country = Country::find($id);
        $country->name = $name;
        $country->save();
        return response()->json(['success'=>"Edit Country Success!"]);

    }
    public function editCity(Request $request,$id){
        $name = $request->name;
        $parent_id = $request->foreign_id;
        if($parent_id){
            $city = City::find($id);
            $city->name = $name;
            $city->country_id = $parent_id;
            $city->save();
            return response()->json(['success'=>"Edit City Success!"]);
        }
        else{
            return response()->json(['error'=>"Edit City failed!"]);
        }
    }
    public function editDistrict(Request $request,$id){
        $name = $request->name;
        $parent_id = $request->foreign_id;
        if($parent_id){
            $district = District::find($id);
            $district->name = $name;
            $district->city_id = $parent_id;
            $district->save();
            return response()->json(['success'=>"Edit District Success!"]);
        }
        else{
            return response()->json(['error'=>"Edit District Failed!"]);
        }
    }
    public function editWard(Request $request,$id){
        $name = $request->name;
        $parent_id = $request->foreign_id;
        if($parent_id){
            $Ward = Ward::find($id);
            $Ward->name = $name;
            $Ward->city_id = $parent_id;
            $Ward->save();
            return response()->json(['success'=>"Edit Ward Success!"]);
        }
        else{
            return response()->json(['error'=>"Edit Ward Failed!"]);
        }
    }
    public function getSearchLocation(Request $request){
        $title = $request->get('q');
        $ward = Ward::where('name','like','%'.$title.'%')->with('district.city.country')->limit(5)->get();
        if(count($ward)==0){
            $district = District::where('name','like','%'.$title.'%')->with('city.country')->limit(5)->get(5);
            if(count($district)==0){
                $city = City::where('name','like','%'.$title.'%')->limit(5)->get(5);
                if(count($city)==0){
                    $country = Country::where('id',$city->country)->get();
                    if(count($country)==0){
                        return response()->json([]);
                    }
                    else{
                        return response()->json($country);
                    }

                }
                else{
                    return response()->json($city);
                }
            }
            else{
            return response()->json($district);
            }

        }
        else{
            return response()->json($ward);
        }

    }
}