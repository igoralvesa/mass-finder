<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;
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

    /**
     * @OA\Get(
     *     path="/public/parishes",
     *     summary="Listar paróquias aprovadas",
     *     tags={"Public"},
     *     @OA\Parameter(name="neighborhood", in="query", required=false, @OA\Schema(type="string"), description="Filtrar por bairro"),
     *     @OA\Parameter(name="day_of_week", in="query", required=false, @OA\Schema(type="string"), description="0-6 ou sunday-saturday"),
     *     @OA\Response(response=200, description="Lista paginada de paróquias", @OA\JsonContent(
     *         @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Parish")),
     *         @OA\Property(property="links", type="object"),
     *         @OA\Property(property="meta", type="object")
     *     )),
     *     @OA\Response(response=422, description="Validação falhou", @OA\JsonContent(ref="#/components/schemas/ErrorValidationResponse"))
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/public/parishes/{parish}",
     *     summary="Exibir paróquia por ID",
     *     tags={"Public"},
     *     @OA\Parameter(name="parish", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Paróquia com horários de missa", @OA\JsonContent(
     *         @OA\Property(property="data", ref="#/components/schemas/ParishDetail")
     *     )),
     *     @OA\Response(response=404, description="Paróquia não encontrada", @OA\JsonContent(ref="#/components/schemas/GenericMessageResponse"))
     * )
     */
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
