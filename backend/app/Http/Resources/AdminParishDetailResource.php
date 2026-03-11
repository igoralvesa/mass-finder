<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminParishDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'cnpj' => $this->cnpj,
            'neighborhood' => $this->neighborhood,
            'address' => $this->address,
            'status' => $this->status,
            'rejection_reason' => $this->rejection_reason,
            'mass_schedules' => MassScheduleResource::collection($this->whenLoaded('massSchedules')),
        ];
    }
}
