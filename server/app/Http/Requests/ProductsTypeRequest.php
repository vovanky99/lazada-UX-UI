<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductsTypeRequest extends FormRequest
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
            'descriptions'=>'bail|required|min:30|max:200'
        ];
    }
    public function messages()
    {
        return [
            'title.required'=>'vui long nhap tieu de',
            'title.min'=>'tieu de toi thieu 6 ky tu',
            'title.max'=>'tieu de khong duoc vuot qua 20 ky tu',
            'descriptions.required'=>'vui long nhap tieu de',
            'descriptions.min'=>'tieu de toi thieu 30 ky tu',
            'descriptions.max'=>'tieu de khong duoc vuot qua 200 ky tu'
        ];
    }
}