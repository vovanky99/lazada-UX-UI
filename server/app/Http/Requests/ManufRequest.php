<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ManufRequest extends FormRequest
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
            'name'=>'bail|required|max:25',
            'descriptions'=>'bail|required|min:20|max:100',
        ];
    }
    public function messages()
    {
        return [
            'name.required' =>'vui long nhap ten!',
            'name.max'=> 'ten khong the vuot qua 25 ky tu!',
            'descriptions.required' =>'mo ta khong the de trong!',
            'descriptions.min'=>'phai mo ta nha san xuat toi thieu 20 ky tu!',
            'descriptions.max'=>'khong the mo ta qua 100 ky tu!',
        ];
    }
}