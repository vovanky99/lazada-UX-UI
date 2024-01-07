<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'bail|required|min:8|max:30',
            'username'=>'bail|required|unique:users|min:8|max:20',
            'password'=>'bail|required|min:8|max:16',
            'email'=>'bail|required|unique:users|email',
            'phone_number'=>'bail|required|numeric',
            'address'=>'bail|required',
            'role'=>'bail|required|numeric',
            'new_avatar'=>'bail|required|mimes:jpg,jpeg,png,gif|max:10000',
            'gender'=>'bail|required|numeric',
            'birthday'=>'bail|required'
        ];
    }
    public function message()
    {
        return [
            'name.required'=>'vui lòng điền tên !',
            'name.min'=>'tên tối thiểu phải 8 ký tự !',
            'name.max'=>'tên tối đa 30 ký tự !',
            'username.required'=>'vui lòng điền username!',
            'username.unique'=>'username đã có!',
            'username.min'=>'username tối thiểu phải 8 ký tự!',
            'username.max'=>'username tối đa 20 ký tự!',
            'password.required'=>'vui lòng điền password!',
            'password.min'=>'mật khẩu tối thiểu phải 8 ký tự!',
            'password.max'=>'mật khẩu tối đa phải 16 ký tự!',
            'email.required'=>'vui lòng điền email!',
            'email.unique'=>'email đã được dùng!',
            'phone_number.required'=>'vui lòng nhập số điện thoại!',
            'phone_number.numeric'=>'vui lòng chỉ nhập số!',
            'address.required'=>'vui lòng nhập địa chỉ!',
            'role.numeric'=>'vui lòng chọn vai trò!',
            'new_avatar.required'=>'vui lòng lựa chọn avatar',
            'new_avatar.mines' =>`avatar không phải là đuôi .jpg .jpeg .png .gif`,
            'new_avatar.max'=>`avatar không thể vượt quá 9MB `,
            'gender.numeric'=>'vui lòng chọn giới tính',
            'birthday.required'=>'vui lòng chọn ngày sinh'
        ];
    }
}