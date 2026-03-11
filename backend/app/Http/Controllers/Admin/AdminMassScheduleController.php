<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminStoreMassScheduleRequest;
use App\Http\Requests\Admin\AdminUpdateMassScheduleRequest;
use App\Http\Resources\MassScheduleResource;
use App\Models\MassSchedule;
use App\Models\Parish;
use Illuminate\Http\JsonResponse;

class AdminMassScheduleController extends Controller
{
    public function index(Parish $parish): JsonResponse
    {
        $schedules = $parish->massSchedules()->orderBy('day_of_week')->orderBy('time')->get();

        return response()->json([
            'data' => MassScheduleResource::collection($schedules),
        ]);
    }

    public function store(AdminStoreMassScheduleRequest $request, Parish $parish): JsonResponse
    {
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

    public function update(AdminUpdateMassScheduleRequest $request, MassSchedule $massSchedule): JsonResponse
    {
        $massSchedule->update($request->validated());

        return response()->json([
            'message' => 'Horário atualizado com sucesso.',
            'data' => new MassScheduleResource($massSchedule),
        ]);
    }

    public function destroy(MassSchedule $massSchedule): JsonResponse
    {
        $massSchedule->delete();

        return response()->json([
            'message' => 'Horário removido com sucesso.',
        ]);
    }
}
