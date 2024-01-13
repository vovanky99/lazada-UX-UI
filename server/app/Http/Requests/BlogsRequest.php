<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogsRequest extends FormRequest
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
            //
            'title'=>'bail|required|min:6|max:30',
            'descriptions'=>'bail|required|min:30|max:100',
            'content'=>'required',
            'categories_id'=>'required'
        ];
    }
    public function messages()
    {
        return [
            'title.required'=>'vui long nhap tieu de!',
            'title.min'=>'tieu de khong duoc it hon 6 ky tu!',
            'title.max'=>'tieu de khong duoc qua 20 ky tu!',
            'descriptions.required'=>'vui long nhap mo ta!',
            'descriptions.min'=>'mo ta khong duoc it hon 30 ky tu!',
            'descriptions.max'=>'mo ta khong duoc qua 100 ky tu!',
            'content.required'=>'vui long nhap noi dung!',
            'categories_id.required'=>'vui long chon the loai!',
        ];
    }
}