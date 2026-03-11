<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/auth/me",
     *     summary="Usuário autenticado",
     *     tags={"Auth"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(response=200, description="Dados do usuário", @OA\JsonContent(
     *         @OA\Property(property="data", ref="#/components/schemas/User")
     *     )),
     *     @OA\Response(response=401, description="Não autenticado", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user()->load('parish');

        return response()->json([
            'data' => new UserResource($user),
        ]);
    }
}
