<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminParishResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'cnpj' => $this->cnpj,
            'neighborhood' => $this->neighborhood,
            'address' => $this->address,
            'status' => $this->status,
            'rejection_reason' => $this->rejection_reason,
        ];
    }
}
