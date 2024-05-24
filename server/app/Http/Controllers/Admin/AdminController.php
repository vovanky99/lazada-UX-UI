<?php 

namespace App\Http\Controllers\Admin ;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Admin;
use App\Models\City;
use App\Models\Country;
use App\Models\District;
use App\Models\Role;
use App\Models\User;
use App\Models\Ward;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller{
    public function store(Request $request){
        $name = $request->name;
        $address = $request->address;
        $phone = $request->phone;
        $avatar = $request->avatar;
        $ward_id = $request->ward_id;
        try{
            $admin = Admin::findOrFail(Auth::user()->id);
            if($ward_id != $admin->address_t->id || $admin->address_t->street_address != $address ){
                $add = Address::findOrFail($admin->address_t->id);
                $add->update([
                    'street_address' => $address,
                    'ward_id' => $ward_id,
                ]);
                $address_id  = $admin->address_t->id; 
            }
            $admin->update([
                'name'=>$name,
                'avatar'=>$avatar,
                'temporary_registration'=>$address_id,
                'phone_number'=>$phone
            ]);
            return response()->json(['success'=>'updated success!'
        ]);
        }
        catch(Exception $e){
            return response()->json(['error'=>$e]);
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

    public function getAllAdmin(Request $request){
        $name = $request->get('name');
        $birthday = $request->get('birthday');
        $role = $request->get('role');
        $department = $request->get('department');
        $gender = $request->get('gender');
        $status = $request->get('status');
        $workAt = $request->get('work_at');
        $leaveOffWork = $request->get('leave_off_work');
        $bornCountry = $request->get('born_country');
        $bornCity = $request->get('born_city');
        $bornDistrict = $request->get('born_district');
        $bornWard = $request->get('born_ward');
        $LiveAtCountry = $request->get('live_at_country');
        $LiveAtCity = $request->get('live_at_city');
        $LiveAtDistrict = $request->get('live_at_district');
        $LiveAtWard = $request->get('live_at_ward');

        $admins = DB::table('admin')->select('admin.*','role.name as role_name','city_born.name as city_born_name','country_born.name as country_born_name','city_live.name as city_live_name','country_live.name as country_live_name','department.name as department_name')->join('role','admin.role_id','=','role.id')->join('address as address_born','address_born.id','=','admin.permanent_residennce_registration')->join('ward as ward_born','ward_born.id','address_born.ward_id')->join('district as district_born','district_born.id','ward_born.district_id')->join('city as city_born','city_born.id','district_born.city_id')->join('country as country_born','country_born.id','city_born.country_id')->join('address as address_live','address_live.id','=','admin.temporary_registration')->join('ward as ward_live','ward_live.id','address_live.ward_id')->join('district as district_live','district_live.id','ward_live.district_id')->join('city as city_live','city_live.id','district_live.city_id')->join('country as country_live','country_live.id','city_live.country_id')->leftJoin('department','department.id','=','admin.department_id')->where('admin.name','like','%'.$name.'%');
        if($birthday ){
           $admins->where('birthday',$birthday);
        }
        if($department ){
            $admins->where('department_id',$department);
        }
        if($role){
            $admins->where('role_id',$role);
        }
        if($gender){
            $admins->where('gender',$gender);
        }
        if($status =='0' || $status =='1'){
            $admins->where('admin.status',$status);
        } 
        if($workAt ){
            $admins->where('admin.created_at',$workAt);
        } 
        if($leaveOffWork){
            $admins->where([['admin.updated_at',$leaveOffWork],['admin.status',1]]);
        }
        if($LiveAtWard){
            $admins->where('address_live.ward_id',$LiveAtWard);
        }
        else{
            if($LiveAtDistrict){
                $admins->where('ward_live.district_id',$LiveAtDistrict);
            }
            else{
               if($LiveAtCity){ 
                $admins->where('district_live.city_id',$LiveAtCity);
            }else{
                if($LiveAtCountry){
                    $admins->where('city_live.country_id',$LiveAtCountry);
                }
               }
            }
        }
        if($bornWard){
            $admins->where('address_born.ward_id',$bornWard);
        }
        else{
            if($bornDistrict){
                $admins->where('ward_born.district_id',$bornDistrict);
            }
            else{
               if($bornCity ){ 
                $admins->where('district_born.city_id',$bornCity);
            }else{
                if($bornCountry ){
                    $admins->where('city_born.country_id',$bornCountry);
                }
               }
            }
        }
        $admin = $admins->get();
        return response()->json($admin);
    }
    public function deleteAdmin($id){
        $admin = Admin::find($id);
        $admin->delete();
        return response()->json(['success','deleted success!']);
    }
}