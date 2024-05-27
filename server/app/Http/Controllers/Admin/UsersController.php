<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\Address;
use App\Models\AddressUser;
use App\Models\User;
use App\Models\Role;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Ui\Presets\React;

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
    public function store(UserRequest $request)
    {
        $name = $request->name;
        $email = $request->email;
        $phone_number = $request->phone_number;
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
            'password'=>$password,
            'avatar'=>$avatar,
            'gender'=>$gender,
            'birthday'=>$birthday,
            'address_id'=>$addressC->id,
        ]);

        // update address for user
        $address->update([
            'addressable_id'=>$user->id,
            'addressable_type'=>User::class,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function Show(string $id)
    {
        $user = DB::table('users')->select('users.*','country.name as country_name','city.name as city_name')->join('address','address.id','=','users.address_id')->join('ward','ward.id','=','address.ward_id')->join('district','district.id','=','ward.district_id')->join('city','city.id','=','city.district.city_id')->join('country','country.id','=','city.country_id')->where('users.id',$id)->get();
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $name = $request->name;
        $email = $request->email;
        $phone_number = $request->phone_number;
        $password = $request->password;
        $avatar = $request->avatar;
        $gender = $request->gender;
        $birthday = $request->birthday;
        $address = $request->address;
        $ward = $request->ward;
        $users = User::find($id);
        if($address !== $users->address->street_address || $ward !== $users->address->id){
            $users->address->update([
                'street_address'=>$address,
                'ward_id'=>$ward,
            ]);
        }
        $users->update([
            'name'=>$name,
            'email'=>$email,
            'phone_number'=>$phone_number,
            'password'=>$password,
            'avatar'=>$avatar,
            'gender'=>$gender,
            'birthday'=>$birthday,
        ]);
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