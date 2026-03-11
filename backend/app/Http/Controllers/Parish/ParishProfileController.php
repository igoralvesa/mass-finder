<?php

namespace App\Http\Controllers\Parish;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;
use App\Http\Requests\Parish\UpdateParishProfileRequest;
use App\Http\Resources\ParishDetailResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParishProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/parish/profile",
     *     summary="Perfil da paróquia",
     *     tags={"Parish"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(response=200, description="Perfil com horários", @OA\JsonContent(
     *         @OA\Property(property="data", ref="#/components/schemas/ParishDetail")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
    public function show(Request $request): JsonResponse
    {
        $parish = $request->user()->parish;

        if (! $parish) {
            return response()->json(['message' => 'Paróquia não encontrada.'], 404);
        }

        $parish->load('massSchedules');

        return response()->json([
            'data' => new ParishDetailResource($parish),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/parish/profile",
     *     summary="Atualizar perfil da paróquia",
     *     tags={"Parish"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/UpdateParishProfileRequest")),
     *     @OA\Response(response=200, description="Perfil atualizado", @OA\JsonContent(
     *         @OA\Property(property="message", type="string"),
     *         @OA\Property(property="data", ref="#/components/schemas/ParishDetail")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=403, description="Sem permissão", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse")),
     *     @OA\Response(response=422, description="Validação falhou", @OA\JsonContent(ref="#/components/schemas/ErrorValidationResponse"))
     * )
     */
    public function update(UpdateParishProfileRequest $request): JsonResponse
    {
        $parish = $request->user()->parish;

        if (! $parish) {
            return response()->json(['message' => 'Paróquia não encontrada.'], 404);
        }

        $parish->update($request->validated());

        return response()->json([
            'message' => 'Perfil atualizado com sucesso.',
            'data' => new ParishDetailResource($parish->load('massSchedules')),
        ]);
    }
}
