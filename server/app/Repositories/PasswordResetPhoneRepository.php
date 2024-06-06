<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PasswordResetphoneRepository{
    protected $table = 'password_resets_phone';
    public function createToken($phone_number){
        $token = Str::random(60);
        $this->deleteExisting($phone_number);
        DB::table($this->table)->insert([
            'phone_number'=>$phone_number,
            'token'=>$token,
            'created_at'=>Carbon::now(),

        ]);
        return $token;
    }
    public function deleteExisting($phone_number){
        Db::table($this->table)->where('phone_number',$phone_number)->delete();
    }
    public function tokenExist($phone_number,$token){
        return DB::table($this->table)->where([['phone_number',$phone_number],['token',$token]])->exists();
    }
    public function deleteToken($phone_number){
        Db::table($this->table)->where('phone_number',$phone_number)->delete();
    }
}