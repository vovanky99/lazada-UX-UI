<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
   
    public function index(Request $request)
    {
        $name = $request->name;
        $phone = $request->phone;
        $email = $request->email;
        $status = $request->status;
        $gender = $request->gender;
        $country = $request->country;
        $city = $request->city;
        $district = $request->district;
        $ward = $request->ward;
        $birthday = $request->birthday;
        $birthday_to = $request->birthday_to;
        $birthday_from = $request->birthday_from;
        $user = DB::table('users')->select('users.*','country.name as country_name','city.name as city_name')->leftJoin('address','address.id','=','users.address_id')->leftJoin('ward','ward.id','=','address.ward_id')->leftJoin('district','district.id','=','ward.district_id')->leftJoin('city','city.id','=','district.city_id')->leftJoin('country','country.id','=','city.country_id')->where([['users.name','like',$name."%"],['users.phone_number','like','%'.$phone.'%']]);
        // if($status == '1' || $status =='0'){
        //     $user->where('users.status',$status);
        // }
        // if($gender =='1' || $gender =='0'){
        //     $user->where('users.gender',$gender);
        // }
        // if($email){
        //     $user->where('users.email','%'.$email.'%');
        // }
        // if($birthday){
        //     $user->where('users.birthday',$birthday);
        // }
        // else {
        //     if($birthday_to){
        //         $user->where('users.birthday','>=',$birthday_to);
        //     }
        //     if($birthday_from){
        //         $user->where('users.birthday','<=',$birthday_from);
        //     }
        // }
        // if($ward){
        //     $user->where('address.ward_id',$ward);
        // }
        // else if($district){
        //     $user->where('ward.district_id',$district);
        // }
        // else if($city){
        //     $user->where('district.city_id',$city);
        // }
        // else if($country){
        //     $user->where('district.country_id',$country);
        // }
        $users = $user->get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $name = $request->name;
        $email = $request->email;
        $phone_number = $request->phone;
        $password = $request->password;
        $avatar = $request->avatar;
        $gender = $request->gender;
        $birthday = $request->birthday;
        $address = $request->address;
        $ward_id = $request->ward_id;

        // create address for user 
        if($address && $ward_id){
            $addressC = Address::create([
                'street_address'=>$address,
                'ward_id'=>$ward_id,
            ]);
        }

        // create user
        $user = User::create([
            'name'=>$name,
            'email'=>$email,
            'phone_number'=>$phone_number,
            'password'=>Hash::make($password),
            'avatar'=>$avatar,
            'gender'=>$gender,
            'birthday'=>$birthday,
            'address_id'=>$addressC->id,
        ]);

        // update address for user
        Address::find($addressC->id)->update([
            'addressable_id'=>$user->id,
            'addressable_type'=>User::class,
        ]);
        return response()->json(['success'=>'Created Success!']);

    }

    /**
     * Display the specified resource.
     */
    public function Show(string $id)
    {
        $user = User::where('id',$id)->with('address.ward.district.city.country')->get();
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $status = $request->status;
        $avatar = $request->avatar;
        $phone = $request->phone;
        $birthday = $request->birthday;
        $ward_id = $request->ward_id;
        $address = $request->address;
        $gender = $request->gender;
        $users = User::find($id);
        if($address !== $users->address?->street_address || $ward_id !== $users->address?->id){
            if($users->address_id){
                Address::find($users->address_id)->update([
                    'street_address'=>$address,
                    'ward_id'=>$ward_id,
                ]);
                $address_id = $users->address_id;
            }
            else{
                $address_id =Address::create([
                    'addressable_id'=>$users->id,
                    'addressable_type'=>User::class,
                    'street_address'=>$address,
                    'ward_id'=>$ward_id,
                ])->id;
            }
           
        }
        else{
            $address_id = $users->address_id;
        }
        if($password){
            $users->update([
                'name'=>$name,
                'email'=>$email,
                'status'=>$status,
                'phone_number'=>$phone,
                'password'=>Hash::make($password),
                'avatar'=>$avatar,
                'gender'=>$gender,
                'birthday'=>$birthday,
                'address_id'=>$address_id,
            ]);
        }
        else{
            $users->update([
                'name'=>$name,
                'email'=>$email,
                'status'=>$status,
                'phone_number'=>$phone,
                'avatar'=>$avatar,
                'gender'=>$gender,
                'birthday'=>$birthday,
                'address_id'=>$address_id,
            ]);
        }
        return response()->json(['success'=>'updated success!']);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function Delete(string $id)
    {

        $users = User::findOrFail($id);
        Address::where([['addressable_id',$users->id],['addressable_type',User::class]])->delete();
        $users->delete();
        return response()->json(['success'=>'deleted success!']);
    }
}