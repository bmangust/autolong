<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            '*_create' => 'required|integer|min:0|max:1',
            '*_update' => 'required|integer|min:0|max:1',
            '*_show' => 'required|integer|min:0|max:1',
            '*_delete' => 'required|integer|min:0|max:1',
            '*_index' => 'required|integer|min:0|max:1',
            'orders_show_cargo' => 'required|integer|min:0|max:1',
        ];
    }
}
