<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;
use App\Http\Requests\Admin\AdminRejectParishRequest;
use App\Http\Requests\Admin\AdminUpdateParishRequest;
use App\Http\Resources\AdminParishDetailResource;
use App\Http\Resources\AdminParishResource;
use App\Models\Parish;
use Illuminate\Http\JsonResponse;

class AdminParishController extends Controller
{
    /**
     * @OA\Get(
     *     path="/admin/parishes",
     *     summary="Listar todas as paróquias",
     *     tags={"Admin"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(response=200, description="Lista de paróquias", @OA\JsonContent(
     *         @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/AdminParish"))
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
    public function index(): JsonResponse
    {
        $parishes = Parish::with('user')->orderBy('name')->get();

        return response()->json([
            'data' => AdminParishResource::collection($parishes),
        ]);
    }

    /**
     * @OA\Get(
     *     path="/admin/parishes/{parish}",
     *     summary="Exibir paróquia por ID",
     *     tags={"Admin"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="parish", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Paróquia com horários", @OA\JsonContent(
     *         @OA\Property(property="data", ref="#/components/schemas/AdminParishDetail")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
    public function show(Parish $parish): JsonResponse
    {
        $parish->load(['user', 'massSchedules']);

        return response()->json([
            'data' => new AdminParishDetailResource($parish),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/admin/parishes/{parish}",
     *     summary="Atualizar paróquia",
     *     tags={"Admin"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="parish", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/AdminUpdateParishRequest")),
     *     @OA\Response(response=200, description="Paróquia atualizada", @OA\JsonContent(
     *         @OA\Property(property="message", type="string"),
     *         @OA\Property(property="data", ref="#/components/schemas/AdminParishDetail")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=422, description="Validação falhou", @OA\JsonContent(ref="#/components/schemas/ErrorValidationResponse"))
     * )
     */
    public function update(AdminUpdateParishRequest $request, Parish $parish): JsonResponse
    {
        $parish->update($request->validated());

        return response()->json([
            'message' => 'Paróquia atualizada com sucesso.',
            'data' => new AdminParishDetailResource($parish->load('massSchedules')),
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/admin/parishes/{parish}",
     *     summary="Remover paróquia",
     *     tags={"Admin"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="parish", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Paróquia removida", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
    public function destroy(Parish $parish): JsonResponse
    {
        $parish->delete();

        return response()->json([
            'message' => 'Paróquia removida com sucesso.',
        ]);
    }

    /**
     * @OA\Patch(
     *     path="/admin/parishes/{parish}/approve",
     *     summary="Aprovar paróquia",
     *     tags={"Admin"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="parish", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Paróquia aprovada", @OA\JsonContent(
     *         @OA\Property(property="message", type="string"),
     *         @OA\Property(property="data", ref="#/components/schemas/AdminParishDetail")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
    public function approve(Parish $parish): JsonResponse
    {
        $parish->update([
            'status' => Parish::STATUS_APPROVED,
            'rejection_reason' => null,
        ]);

        return response()->json([
            'message' => 'Paróquia aprovada com sucesso.',
            'data' => new AdminParishDetailResource($parish->load('massSchedules')),
        ]);
    }

    /**
     * @OA\Patch(
     *     path="/admin/parishes/{parish}/reject",
     *     summary="Rejeitar paróquia",
     *     tags={"Admin"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(name="parish", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/RejectParishRequest")),
     *     @OA\Response(response=200, description="Paróquia rejeitada", @OA\JsonContent(
     *         @OA\Property(property="message", type="string"),
     *         @OA\Property(property="data", ref="#/components/schemas/AdminParishDetail")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=422, description="Validação falhou", @OA\JsonContent(ref="#/components/schemas/ErrorValidationResponse"))
     * )
     */
    public function reject(AdminRejectParishRequest $request, Parish $parish): JsonResponse
    {
        $parish->update([
            'status' => Parish::STATUS_REJECTED,
            'rejection_reason' => $request->validated('rejection_reason'),
        ]);

        return response()->json([
            'message' => 'Paróquia rejeitada.',
            'data' => new AdminParishDetailResource($parish->load('massSchedules')),
        ]);
    }
}
