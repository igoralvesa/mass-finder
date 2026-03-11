<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MassScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'parish_id' => $this->parish_id,
            'day_of_week' => $this->day_of_week,
            'time' => $this->formatTime($this->time),
            'notes' => $this->notes,
        ];
    }

    private function formatTime(mixed $time): string
    {
        if (is_string($time)) {
            return substr($time, 0, 5); // HH:MM
        }
        if ($time instanceof \Carbon\Carbon) {
            return $time->format('H:i');
        }
        return (string) $time;
    }
}
