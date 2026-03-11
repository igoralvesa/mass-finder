<?php

namespace App\Http\Controllers\Parish;

use App\Http\Controllers\Controller;
use App\Http\Requests\Parish\StoreMassScheduleRequest;
use App\Http\Requests\Parish\UpdateMassScheduleRequest;
use App\Http\Resources\MassScheduleResource;
use App\Models\MassSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MassScheduleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $parish = $request->user()->parish;

        if (! $parish) {
            return response()->json(['message' => 'Paróquia não encontrada.'], 404);
        }

        $schedules = $parish->massSchedules()->orderBy('day_of_week')->orderBy('time')->get();

        return response()->json([
            'data' => MassScheduleResource::collection($schedules),
        ]);
    }

    public function store(StoreMassScheduleRequest $request): JsonResponse
    {
        $parish = $request->user()->parish;

        if (! $parish) {
            return response()->json(['message' => 'Paróquia não encontrada.'], 404);
        }

        $schedule = $parish->massSchedules()->create([
            'day_of_week' => $request->validated('day_of_week'),
            'time' => $request->validated('time'),
            'notes' => $request->validated('notes'),
        ]);

        return response()->json([
            'message' => 'Horário criado com sucesso.',
            'data' => new MassScheduleResource($schedule),
        ], 201);
    }

    public function update(UpdateMassScheduleRequest $request, MassSchedule $massSchedule): JsonResponse
    {
        $parish = $request->user()->parish;

        if (! $parish || $massSchedule->parish_id !== $parish->id) {
            return response()->json(['message' => 'Horário não encontrado.'], 404);
        }

        $massSchedule->update($request->validated());

        return response()->json([
            'message' => 'Horário atualizado com sucesso.',
            'data' => new MassScheduleResource($massSchedule),
        ]);
    }

    public function destroy(Request $request, MassSchedule $massSchedule): JsonResponse
    {
        $parish = $request->user()->parish;

        if (! $parish || $massSchedule->parish_id !== $parish->id) {
            return response()->json(['message' => 'Horário não encontrado.'], 404);
        }

        $massSchedule->delete();

        return response()->json([
            'message' => 'Horário removido com sucesso.',
        ]);
    }
}
