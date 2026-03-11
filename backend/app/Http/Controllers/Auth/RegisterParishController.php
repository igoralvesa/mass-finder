<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterParishRequest;
use App\Http\Resources\UserResource;
use App\Models\Parish;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class RegisterParishController extends Controller
{
    public function store(RegisterParishRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => $request->validated('password'),
            'role' => User::ROLE_PARISH,
        ]);

        Parish::create([
            'user_id' => $user->id,
            'name' => $request->validated('name'),
            'cnpj' => $request->validated('cnpj'),
            'neighborhood' => $request->validated('neighborhood'),
            'address' => $request->validated('address'),
            'status' => Parish::STATUS_PENDING,
        ]);

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Paróquia cadastrada com sucesso. Verifique seu email.',
            'data' => new UserResource($user->load('parish')),
        ], 201);
    }
}
