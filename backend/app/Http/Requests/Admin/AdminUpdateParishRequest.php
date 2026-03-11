<?php

namespace App\Http\Requests\Admin;

use App\Models\Parish;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminUpdateParishRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $parishId = $this->route('parish')?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'cnpj' => ['required', 'string', 'max:18', Rule::unique('parishes', 'cnpj')->ignore($parishId)],
            'neighborhood' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'status' => ['nullable', 'string', Rule::in([Parish::STATUS_PENDING, Parish::STATUS_APPROVED, Parish::STATUS_REJECTED])],
            'rejection_reason' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
