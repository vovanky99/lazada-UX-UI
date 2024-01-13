<?php

namespace App\Http\Controllers\back_end;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

use App\Models\User;
use App\Models\Decentralization;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
   
    public function __construct()
    {
        return $this->middleware('auth');
    }
    public function index()
    {
        $users = User::paginate(15);
        $count_users = User::count();
        $decentralization = Decentralization::all();
        return view('users/index',compact('users','count_users','decentralization'));
    }

    public function search(Request $request){
        if($request->search_role>0){
            $users = User::where('decentralization_id','=',$request->search_role)->where('name','like','%'.$request->search.'%');
            $count_users = $users->count();
            $users = $users->paginate(15);
        }
        else{
            $users = User::where('name','like','%'.$request->search.'%');
            $count_users = $users->count();
            $users = $users->paginate(15);
        }
        $selected_role = $request->search_role;
        $decentralization = Decentralization::all();
        return view('users/index',compact('users','count_users','decentralization','selected_role'));
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
    public function store(UserRequest $request)
    {
        //
        $user = new User;
        
        //get avatar
        $getavatar = '';
        if($request->hasFile('new_avatar')){
            $this->validate($request,[
                'new_avatar' => 'mimes:jpg,jpeg,png,gif|max:10000',
            ],[
                'new_avatar.mimes' =>`avatar don't .jpg .jpeg .png .gif`,
                'new_avatar.max'=>`avatar can't limit 9MB `,
            ]);
            $avatar = $request->new_avatar;
            $getavatar = $avatar->getClientOriginalName();
            $destinationPath = public_path('upload/images');
            $avatar->move($destinationPath,$getavatar);
            
        }
       
        $user->name = $request->name;
        $user->avatar = $getavatar;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->decentralization_id = $request->role;
        $user->level = $request->level;
        $user->status = $request->status;
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        $user->save();
        $count_users = User::count();
        $decentralization = Decentralization::all();
        $users = User::paginate(15);;
        return view('users/index',compact('users','count_users','decentralization'));
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
    public function update(UserRequest $request, string $id)
    {
        //
       
        $user = User::findOrFail($id);
        if(empty($user->avatar)){
            $this->validate($request,[
                'new_avatar'=>'bail|required'
            ]);
        }
        //get avatar
        $getavatar = '';
        if($request->hasFile('new_avatar')){
            $avatar = $request->new_avatar;
            $getavatar = $avatar->getClientOriginalName();
            $destinationPath = public_path('upload/images');
            $avatar->move($destinationPath,$getavatar);
            
        }
        if($request->new_avatar==''){
            $user->avatar = $user->avatar;
        }
        else{
            $user->avatar = $getavatar;
        }
        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->level = $request->level;
        $user->status = $request->status;
        $user->gender = $request->gender;
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        $user->save();
        $users = User::paginate(15);
        return view('users/index',compact('users'))->with('success','update user success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        User::findOrFail($id)->delete();
        return redirect()->route('users.index');
    }
}