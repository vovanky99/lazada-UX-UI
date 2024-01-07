<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class catRequest extends FormRequest
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
            'title'=>'bail|required|min:8|max:30',
        ];
    }
    public function messages()
    {
        return [
            'title.required'=>'vui lòng nhập tiêu đề cat!',
            'title.min'=>'tiêu đề tối thiểu 8 ký tự!',
            'title.max'=>'tiêu đề tối thiểu 30 ký tự!'
        ];
    }
}