<?php

namespace App\Http\Controllers\Parish;

use App\Http\Controllers\Controller;
use App\Http\Requests\Parish\UpdateParishProfileRequest;
use App\Http\Resources\ParishDetailResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParishProfileController extends Controller
{
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
