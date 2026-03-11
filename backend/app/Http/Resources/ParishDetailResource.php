<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParishDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'cnpj' => $this->cnpj,
            'neighborhood' => $this->neighborhood,
            'address' => $this->address,
            'mass_schedules' => MassScheduleResource::collection($this->whenLoaded('massSchedules')),
        ];
    }
}
