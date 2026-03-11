<?php

namespace App\Http\OpenApi;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Paróquia São José"),
 *         @OA\Property(property="email", type="string", format="email", example="contato@paroquia.org"),
 *         @OA\Property(property="role", type="string", enum={"admin", "parish"}),
 *         @OA\Property(property="email_verified_at", type="string", format="date-time", nullable=true),
 *         @OA\Property(property="parish", ref="#/components/schemas/ParishDetail", nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="Parish",
 *     type="object",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Paróquia São José"),
 *         @OA\Property(property="cnpj", type="string", example="12.345.678/0001-90"),
 *         @OA\Property(property="neighborhood", type="string", nullable=true),
 *         @OA\Property(property="address", type="string", nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="ParishDetail",
 *     type="object",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Paróquia São José"),
 *         @OA\Property(property="cnpj", type="string", example="12.345.678/0001-90"),
 *         @OA\Property(property="neighborhood", type="string", nullable=true),
 *         @OA\Property(property="address", type="string", nullable=true),
 *         @OA\Property(property="mass_schedules", type="array", @OA\Items(ref="#/components/schemas/MassSchedule"))
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="MassSchedule",
 *     type="object",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="parish_id", type="integer", example=1),
 *         @OA\Property(property="day_of_week", type="integer", minimum=0, maximum=6, description="0=Domingo, 1=Segunda, ..., 6=Sábado"),
 *         @OA\Property(property="time", type="string", example="08:00"),
 *         @OA\Property(property="notes", type="string", nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="AdminParish",
 *     type="object",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Paróquia São José"),
 *         @OA\Property(property="cnpj", type="string", example="12.345.678/0001-90"),
 *         @OA\Property(property="neighborhood", type="string", nullable=true),
 *         @OA\Property(property="address", type="string", nullable=true),
 *         @OA\Property(property="status", type="string", enum={"pending", "approved", "rejected"}),
 *         @OA\Property(property="rejection_reason", type="string", nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="AdminParishDetail",
 *     type="object",
 *     properties={
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="user_id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Paróquia São José"),
 *         @OA\Property(property="cnpj", type="string", example="12.345.678/0001-90"),
 *         @OA\Property(property="neighborhood", type="string", nullable=true),
 *         @OA\Property(property="address", type="string", nullable=true),
 *         @OA\Property(property="status", type="string", enum={"pending", "approved", "rejected"}),
 *         @OA\Property(property="rejection_reason", type="string", nullable=true),
 *         @OA\Property(property="mass_schedules", type="array", @OA\Items(ref="#/components/schemas/MassSchedule"))
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="LoginRequest",
 *     type="object",
 *     required={"email", "password"},
 *     properties={
 *         @OA\Property(property="email", type="string", format="email", example="admin@example.com"),
 *         @OA\Property(property="password", type="string", format="password", example="password")
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="RegisterParishRequest",
 *     type="object",
 *     required={"name", "email", "password", "password_confirmation", "cnpj"},
 *     properties={
 *         @OA\Property(property="name", type="string", maxLength=255, example="Paróquia São José"),
 *         @OA\Property(property="email", type="string", format="email", maxLength=255, example="contato@paroquia.org"),
 *         @OA\Property(property="password", type="string", format="password", minLength=8, example="password123"),
 *         @OA\Property(property="password_confirmation", type="string", format="password", example="password123"),
 *         @OA\Property(property="cnpj", type="string", maxLength=18, example="12.345.678/0001-90"),
 *         @OA\Property(property="neighborhood", type="string", maxLength=255, nullable=true),
 *         @OA\Property(property="address", type="string", maxLength=500, nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="UpdateParishProfileRequest",
 *     type="object",
 *     required={"name"},
 *     properties={
 *         @OA\Property(property="name", type="string", maxLength=255, example="Paróquia São José"),
 *         @OA\Property(property="neighborhood", type="string", maxLength=255, nullable=true),
 *         @OA\Property(property="address", type="string", maxLength=500, nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="AdminUpdateParishRequest",
 *     type="object",
 *     required={"name", "cnpj"},
 *     properties={
 *         @OA\Property(property="name", type="string", maxLength=255, example="Paróquia São José"),
 *         @OA\Property(property="cnpj", type="string", maxLength=18, example="12.345.678/0001-90"),
 *         @OA\Property(property="neighborhood", type="string", maxLength=255, nullable=true),
 *         @OA\Property(property="address", type="string", maxLength=500, nullable=true),
 *         @OA\Property(property="status", type="string", enum={"pending", "approved", "rejected"}, nullable=true),
 *         @OA\Property(property="rejection_reason", type="string", maxLength=1000, nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="CreateMassScheduleRequest",
 *     type="object",
 *     required={"day_of_week", "time"},
 *     properties={
 *         @OA\Property(property="day_of_week", type="integer", minimum=0, maximum=6, description="0=Domingo, 1=Segunda, ..., 6=Sábado"),
 *         @OA\Property(property="time", type="string", pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$", example="08:00"),
 *         @OA\Property(property="notes", type="string", maxLength=500, nullable=true)
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="RejectParishRequest",
 *     type="object",
 *     required={"rejection_reason"},
 *     properties={
 *         @OA\Property(property="rejection_reason", type="string", maxLength=1000, example="Documentação incompleta")
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="GenericMessageResponse",
 *     type="object",
 *     properties={
 *         @OA\Property(property="message", type="string", example="Operação realizada com sucesso.")
 *     }
 * )
 *
 * @OA\Schema(
 *     schema="ErrorValidationResponse",
 *     type="object",
 *     properties={
 *         @OA\Property(property="message", type="string", example="The given data was invalid."),
 *         @OA\Property(property="errors", type="object", additionalProperties=@OA\AdditionalProperties(type="array", @OA\Items(type="string")))
 *     }
 * )
 */
class Schemas
{
}
