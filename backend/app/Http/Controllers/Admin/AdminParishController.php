<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminRejectParishRequest;
use App\Http\Requests\Admin\AdminUpdateParishRequest;
use App\Http\Resources\AdminParishDetailResource;
use App\Http\Resources\AdminParishResource;
use App\Models\Parish;
use Illuminate\Http\JsonResponse;

class AdminParishController extends Controller
{
    public function index(): JsonResponse
    {
        $parishes = Parish::with('user')->orderBy('name')->get();

        return response()->json([
            'data' => AdminParishResource::collection($parishes),
        ]);
    }

    public function show(Parish $parish): JsonResponse
    {
        $parish->load(['user', 'massSchedules']);

        return response()->json([
            'data' => new AdminParishDetailResource($parish),
        ]);
    }

    public function update(AdminUpdateParishRequest $request, Parish $parish): JsonResponse
    {
        $parish->update($request->validated());

        return response()->json([
            'message' => 'Paróquia atualizada com sucesso.',
            'data' => new AdminParishDetailResource($parish->load('massSchedules')),
        ]);
    }

    public function destroy(Parish $parish): JsonResponse
    {
        $parish->delete();

        return response()->json([
            'message' => 'Paróquia removida com sucesso.',
        ]);
    }

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
