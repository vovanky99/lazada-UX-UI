<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShopRequest extends FormRequest
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
            'name'=>'bail|required|min:6|max:20',
            'descriptions'=>'bail|required|max:50',
            'address'=>'bail|required',
        ];
    }
    public function messages()
    {
        return [
            'name.required'=>'vui long nhap ten',
            'name.max'=>'khong duoc nhap qua 50 ky tu',
            'name.min'=>'khong duoc nhap it hon 6 ky tu',
            'descriptions.required'=>'vui long nhap mo ta',
            'descriptions.max'=>'khong duoc nhap qua 50 ky tu',
            'address.required'=>'vui long nhap dia chi',
        ];
    }
}