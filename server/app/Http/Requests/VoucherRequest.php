<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VoucherRequest extends FormRequest
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
            'title'=>'bail|required|min:6|max:20',
            'descriptions'=>'bail|required|min:30|max:100',
            'code'=>'bail|required|min:8|max:20',
            'percents'=>'required',
            'quantity'=>'required'
        ];
    }
    public function messages()
    {
        return [
            'title.required'=>'vui long nhap tieu de!',
            'title.min'=>'tieu de khong duoc it hon 6 ky tu!',
            'title.max'=>'tieu de khong duoc qua 20 ky tu!',
            'descriptions.required'=>'vui long nhap mo ta!',
            'descriptions.min'=>'tieu de khong duoc it hon 30 ky tu!',
            'descriptions.max'=>'tieu de khong duoc qua 100 ky tu!',
            'code.required'=>'vui long nhap code!',
            'code.min'=>'code khong duoc it hon 8 ky tu!',
            'code.max'=>'code khong duoc qua 20 ky tu!',
            'quantity.required'=>'vui long nhap so luong!',
            'percents.required'=>'vui long chon phan tram!',

        ];
    }
}