<?php 

namespace App\Http\Controllers\Admin ;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Admin;
use App\Models\City;
use App\Models\Country;
use App\Models\District;
use App\Models\User;
use App\Models\Ward;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AdminController extends Controller{
    public function store(Request $request){
        $name = $request->name;
        $address = $request->address;
        $phone = $request->phone;
        $avatar = $request->avatar;
        $ward_id = $request->ward_id;
        try{
            $admin = Admin::findOrFail(Auth::user()->id);
             if($admin->temporary_registration =='' &&$address && $ward_id){
                $addressT = Address::create([
                    'addressable_type'=>User::class,
                    'addressable_id'=>$admin->id,
                    'street_address'=>$address,
                    'ward_id'=>$ward_id,
                ]);
                $address_id  = $addressT->id;
            }
            else if($ward_id != $admin->address_t->id || $admin->address_t->street_address != $address ){
                $add = Address::findOrFail($admin->address_t->id);
                $add->street_address = $address;
                $add->ward_id = $ward_id;
                $add->save();
                $address_id  = $admin->address_t->id;
                
            }
            $admin->update([
                'name'=>$name,
                'avatar'=>$avatar,
                'temporary_registration'=>$address_id,
                'phone_number'=>$phone
            ]);
            return response()->json(['message'=>'updated success!'
        ]);
        }
        catch(Exception $e){
            return response()->json(['message'=>$e],200);
        }  
    }
    public function getSearchLocation(Request $request){
        $title = $request->get('q');
        $ward = Ward::where('name','like','%'.$title.'%')->with('districts.cities.countries')->limit(5)->get();
        if(count($ward)==0){
            $district = District::where('name','like','%'.$title.'%')->with('cities.countries')->limit(5)->get(5);
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