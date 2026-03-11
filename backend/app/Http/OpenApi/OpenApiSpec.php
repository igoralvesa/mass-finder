<?php

namespace App\Http\OpenApi;

/**
 * @OA\Info(
 *     title="Mass Finder API",
 *     version="1.0.0",
 *     description="API para busca de paróquias e horários de missa"
 * )
 *
 * @OA\Server(
 *     url="{baseUrl}/api",
 *     description="API Base URL",
 *     @OA\ServerVariable(serverVariable="baseUrl", default="http://localhost:8000")
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="Sanctum",
 *     description="Token obtido via POST /api/auth/login"
 * )
 *
 * @OA\Tag(name="Public", description="Endpoints públicos - sem autenticação")
 * @OA\Tag(name="Auth", description="Autenticação e registro")
 * @OA\Tag(name="Parish", description="Endpoints da paróquia - requer role parish")
 * @OA\Tag(name="Admin", description="Endpoints administrativos - requer role admin")
 */
class OpenApiSpec
{
}
