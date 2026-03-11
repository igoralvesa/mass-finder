<?php

namespace App\Http\Controllers\Parish;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;
use App\Http\Requests\Parish\StoreMassScheduleRequest;
use App\Http\Requests\Parish\UpdateMassScheduleRequest;
use App\Http\Resources\MassScheduleResource;
use App\Models\MassSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MassScheduleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/parish/mass-schedules",
     *     summary="Listar horários de missa da paróquia",
     *     tags={"Parish"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(response=200, description="Lista de horários", @OA\JsonContent(
     *         @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/MassSchedule"))
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/parish/mass-schedules",
     *     summary="Criar horário de missa",
     *     tags={"Parish"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/CreateMassScheduleRequest")),
     *     @OA\Response(response=201, description="Horário criado", @OA\JsonContent(
     *         @OA\Property(property="message", type="string"),
     *         @OA\Property(property="data", ref="#/components/schemas/MassSchedule")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=422, description="Validação falhou", @OA\JsonContent(ref="#/components/schemas/ErrorValidationResponse"))
     * )
     */
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

    /**
     * @OA\Put(
     *     path="/parish/mass-schedules/{massSchedule}",
     *     summary="Atualizar horário de missa",
     *     tags={"Parish"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="massSchedule", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/CreateMassScheduleRequest")),
     *     @OA\Response(response=200, description="Horário atualizado", @OA\JsonContent(
     *         @OA\Property(property="message", type="string"),
     *         @OA\Property(property="data", ref="#/components/schemas/MassSchedule")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Horário não encontrado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=422, description="Validação falhou", @OA\JsonContent(ref="#/components/schemas/ErrorValidationResponse"))
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/parish/mass-schedules/{massSchedule}",
     *     summary="Remover horário de missa",
     *     tags={"Parish"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="massSchedule", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Horário removido", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Horário não encontrado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
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
