<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Decentralization;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
        // $this->middleware('log')->only('index');
        // $this->middleware('subscribed')->except('store');
    }
    public function index()
    {
        $users = User::all();
        return view('users/index',compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $decentralization = Decentralization::all();
        return view('users.create',compact('decentralization'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = new User;

        //validator
        $validateData = $request->validate([
            'name'=>'bail|required|min:8|max:30',
            'username'=>'bail|required|min:8|max:20',
            'password'=>'bail|required|min:8|max:16',
            'email'=>'bail|required|email',
            'phone_number'=>'bail|required|numeric',
            'address'=>'bail|required',
            'decentralization_id'=>'bail|required|numeric',
            'new_avatar'=>'bail|required',
            'gender'=>'bail|required|numeric',
            'birthday'=>'bail|required|date'
        ]);
        
       
        //get avatar
        $getavatar = '';
        if($request->hasFile('new_avatar')){
            $this->validate($request,[
                'new_avatar' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_avatar.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_avatar.max'=>`avatar can't limit 9MB `,
            ]);
            $avatar = $request->new_avatar;
            $getavatar = time().'_'.$avatar->getClientOriginalName();
            $destinationPath = public_path('upload/images');
            $avatar->move($destinationPath,$getavatar);
            
        }
        $user->name = $request->name;
        $user->avatar = $getavatar;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->decentralization_id = $request->decentralization_id;
        $user->level = $request->level;
        $user->status = $request->status;
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        $user->save();
        $users = User::all();
        return view('users/index',compact('users'))->with('success','update user success');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $users = User::findOrFail($id);
        return view('users.show',compact('users'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $users = User::findOrFail($id);
        return view('users.edit',compact('users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
       
        $user = User::findOrFail($id);
        if(empty($user->avatar)){
            $this->validate($request,[
                'new_avatar'=>'bail|required'
            ]);
        }
        //validator
        $validateData = $request->validate([
            'name'=>'bail|required|min:8|max:30',
            'username'=>'bail|required|min:8|max:20',
            'email'=>'bail|required|email',
            'phone_number'=>'bail|required|numeric',
            'address'=>'bail|required',
            
        ]);
        //get avatar
        $getavatar = '';
        if($request->hasFile('new_avatar')){
            $this->validate($request,[
                'new_avatar' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_avatar.mines' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_avatar.max'=>`avatar can't limit 9MB `,
            ]);
            $avatar = $request->new_avatar;
            $getavatar = time().'_'.$avatar->getClientOriginalName();
            $destinationPath = public_path('upload/images');
            $avatar->move($destinationPath,$getavatar);
            
        }
        $user->name = $request->name;
        $user->avatar = $getavatar;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->level = $request->level;
        $user->status = $request->status;
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        $user->save();
        $users = User::all();
        return view('users/index',compact('users'))->with('success','update user success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}