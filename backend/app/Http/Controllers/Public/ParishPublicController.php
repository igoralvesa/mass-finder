<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ParishDetailResource;
use App\Http\Resources\ParishResource;
use App\Models\MassSchedule;
use App\Models\Parish;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ParishPublicController extends Controller
{
    private const DAY_MAP = [
        'sunday' => MassSchedule::SUNDAY,
        'monday' => MassSchedule::MONDAY,
        'tuesday' => MassSchedule::TUESDAY,
        'wednesday' => MassSchedule::WEDNESDAY,
        'thursday' => MassSchedule::THURSDAY,
        'friday' => MassSchedule::FRIDAY,
        'saturday' => MassSchedule::SATURDAY,
    ];

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Parish::where('status', Parish::STATUS_APPROVED);

        if ($request->filled('neighborhood')) {
            $value = '%'.$request->neighborhood.'%';
            $query->whereRaw('LOWER(neighborhood) LIKE LOWER(?)', [$value]);
        }

        if ($request->filled('day_of_week')) {
            $day = $this->parseDayOfWeek($request->day_of_week);
            if ($day !== null) {
                $query->whereHas('massSchedules', fn ($q) => $q->where('day_of_week', $day));
            }
        }

        $parishes = $query->orderBy('name')->paginate(10);

        return ParishResource::collection($parishes);
    }

    private function parseDayOfWeek(mixed $value): ?int
    {
        if (is_numeric($value) && $value >= 0 && $value <= 6) {
            return (int) $value;
        }

        $key = is_string($value) ? strtolower($value) : null;

        return self::DAY_MAP[$key] ?? null;
    }

    public function show(Parish $parish): JsonResponse
    {
        if ($parish->status !== Parish::STATUS_APPROVED) {
            return response()->json(['message' => 'Paróquia não encontrada.'], 404);
        }

        $parish->load('massSchedules');

        return response()->json([
            'data' => new ParishDetailResource($parish),
        ]);
    }
}
