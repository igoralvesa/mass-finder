<?php

namespace App\Http\Requests\Parish;

use Illuminate\Foundation\Http\FormRequest;

class StoreMassScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'day_of_week' => ['required', 'integer', 'min:0', 'max:6'],
            'time' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
            'notes' => ['nullable', 'string', 'max:500'],
        ];
    }
}
