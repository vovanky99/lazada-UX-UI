<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SlideRequest extends FormRequest
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
            'descriptions'=>'bail|required|min:20|max:100',
            'categories_id'=>'required',
            'start_day'=>'required',
            'end_day'=>'requied'
        ];
    }
    public function messages()
    {
        return [
            'title.required'=>'vui long nhap tieu de!',
            'title.min'=>'tieu de khong duoc it hon 6 ky tu!',
            'title.max'=>'tieu de khong duoc vuot qua 20ky tu!',
            'descriptions.required'=>'vui long nhap mo ta!',
            'descriptions.min'=>'mo ta khong duoc it hon 20 ky tu!',
            'descriptions.max'=>'mo ta khong duoc vuot qua 100 ky tu!',
            'categories_id.required'=>'vui long chon the loai!',
            'start_day.required'=>'vui long chon  ngay bat dau!',
            'end_day.required'=>'vui long chon ngay ket thuc!',
        ];
    }
}