<?php 

namespace App\Http\Controllers\Admin ;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Admin;
use App\Models\Department;
use App\Models\Role;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller{

    //update profile
    public function UpdateProfile(Request $request){
        $name = $request->name;
        $address = $request->address_live;
        $phone = $request->phone_number;
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

    // Store a newly created resource in storage.
    public function create(Request $request){
        $name = $request->name;
        $username = $request->username;
        $password = $request->password;
        $avatar = $request->avatar;
        $phone = $request->phone_number;
        $gender = $request->gender;
        $birthday = $request->birthday;
        $citizen_card = $request->citizen_identification_card;
        $born_ward_id = $request->born_ward_id;
        $live_ward_id = $request->live_at_ward_id;
        $address_born = $request->address_born;
        $address_live = $request->address_live;
        $role_id = $request->role_id;
        $role_name = $request->role_name;
        $department_id = $request->department_id;
        $department_name = $request->department_name;

        // set role id if variable role_id is empty
        if($role_id==''){
            $role = Role::create([
                'name'=>$role_name,
                'description'=>$role_name
            ]);
            $role_id = $role->id;
        }
        // set department id if variable department_id is empty
        if($department_id ==''){
            $department = Department::create([
                'name'=>$department_name,
                'description'=>$department_name
            ]);
            $department_id = $department->id;
        }
        
        //create admin
        $admin = Admin::create([
            'name'=>$name,
            'username'=>$username,
            'password'=>Hash::make($password),
            'avatar'=>$avatar,
            'phone_number'=>$phone,
            'gender'=>$gender,
            'birthday'=>$birthday,
            'citizen_identification_card'=>$citizen_card,
            // 'permanent_residennce_registration'=>$permanent_id,
            // 'temporary_registration '=>$temporary_id,
            'role_id'=>$role_id,
            'department_id'=>$department_id,
        ]);

        //create address born and set id for address born
        $addressBorn = Address::create([
            'addressable_type'=>Admin::class,
            'addressable_id'=>$admin->id,
            'street_address'=>$address_born,
            'ward_id'=>$born_ward_id,
        ]);
        $permanent_id = $addressBorn->id;

        //create address live and set id for address live
        $addressLive = Address::create([
            'addressable_type'=>Admin::class,
            'addressable_id'=>$admin->id,
            'street_address'=>$address_live,
            'ward_id'=>$live_ward_id,
        ]);
        $temporary_id = $addressLive->id;

        //update admin after created address born and live
        $admin->update([
            'permanent_residennce_registration'=>$permanent_id,
            'temporary_registration'=>$temporary_id,
        ]);
        return response()->json(['success'=>'created success!']);
    }


    public function getAllAdmin(Request $request){
        $name = $request->get('name');
        $birthday = $request->get('birthday');
        $role = $request->get('role_id');
        $department = $request->get('department_id');
        $gender = $request->get('gender');
        $status = $request->get('status');
        $workAt = $request->get('work_start_date');
        $leaveOffWork = $request->get('leave_off_work');
        $bornCountry = $request->get('born_country');
        $bornCity = $request->get('born_city');
        $bornDistrict = $request->get('born_district');
        $bornWard = $request->get('born_ward');
        $LiveAtCountry = $request->get('live_country');
        $LiveAtCity = $request->get('live_city');
        $LiveAtDistrict = $request->get('live_district');
        $LiveAtWard = $request->get('live_ward');

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
            $admins->where('admin.created_at','>',$workAt);
        } 
        if($leaveOffWork){
            $admins->where([['admin.updated_at','<',$leaveOffWork],['admin.status',1]]);
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

    public function showAdmin($id){
        $admin =  Admin::where('id',$id)->with('address_t.ward.district.city.country')->with('address_p.ward.district.city.country')->with('role','department')->get();
        return response()->json($admin);
    }

    // handle edit admin
    public function editAdmin(Request $request,$id){
        $name = $request->name;
        $password = $request->password;
        $status = $request->status;
        $avatar = $request->avatar;
        $phone = $request->phone_number;
        $gender = $request->gender;
        $birthday = $request->birthday;
        $citizen_card = $request->citizen_identification_card;
        $born_ward_id = $request->born_ward_id;
        $live_ward_id = $request->live_ward_id;
        $address_born = $request->address_born;
        $address_live = $request->address_live;
        $role_id = $request->role_id;
        $department_id = $request->department_id;
        $adminUp = Admin::findOrFail($id);              
        $admin = DB::table('admin')->select('admin.*','address_born.street_address as address_born_street','address_live.street_address as address_live_street','address_born.ward_id as address_born_ward','address_live.ward_id as address_live_ward')->join('address as address_born','admin.permanent_residennce_registration','=','address_born.id')->join('address as address_live','admin.temporary_registration','=','address_live.id')->where('admin.id',$id)->first();
        
        //update born at when have change
        if($address_born != $admin->address_born_street || $born_ward_id !=$admin->address_born_ward){
            $add_born = Address::findOrFail($adminUp->address_p->id);
            $add_born->update([
                'street_address' => $address_born,
                'ward_id' => $born_ward_id,
            ]);
        }
        //update live at when have change
        if($address_live != $admin->address_live_street || $live_ward_id !=$admin->address_live_ward){
            $add_live = Address::findOrFail($adminUp->address_t->id);
            $add_live->update([
                'ward_id'=>$live_ward_id,
                'street_address'=>$address_live
            ]);
        }

         //update admin
         
         if($password !=''){
            $adminUp->update([
                'name'=>$name,
                'avatar'=>$avatar,
                'status'=>$status,
                'password'=>Hash::make($password),
                'phone_number'=>$phone,
                'gender'=>$gender,
                'birthday'=>$birthday,
                'citizen_identification_card'=>$citizen_card,
                'role_id'=>$role_id,
                'department_id'=>$department_id,
            ]);
         }
         else{
            $adminUp->update([
                'name'=>$name,
                'avatar'=>$avatar,
                'status'=>$status,
                'phone_number'=>$phone,
                'gender'=>$gender,
                'birthday'=>$birthday,
                'citizen_identification_card'=>$citizen_card,
                'role_id'=>$role_id,
                'department_id'=>$department_id,
            ]);
         }    
        return response()->json($adminUp);
    }
    public function deleteAdmin($id){
        $admin = Admin::find($id);
        $admin->delete();
        return response()->json(['success','deleted success!']);
    }
}