<?php

namespace Tests\Feature\Admin;

use App\Models\Parish;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminParishTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_approve_a_parish(): void
    {
        $admin = User::factory()->admin()->create();
        Sanctum::actingAs($admin, ['*']);

        $parishUser = User::factory()->create();
        $parish = Parish::factory()->create([
            'user_id' => $parishUser->id,
            'status' => Parish::STATUS_PENDING,
        ]);

        $response = $this->patchJson("/api/admin/parishes/{$parish->id}/approve");

        $response->assertOk();
        $response->assertJsonPath('message', 'Paróquia aprovada com sucesso.');

        $this->assertDatabaseHas('parishes', [
            'id' => $parish->id,
            'status' => Parish::STATUS_APPROVED,
            'rejection_reason' => null,
        ]);
    }

    public function test_non_admin_cannot_approve_a_parish(): void
    {
        $parishUser = User::factory()->create();
        Sanctum::actingAs($parishUser, ['*']);

        $otherUser = User::factory()->create();
        $parish = Parish::factory()->create([
            'user_id' => $otherUser->id,
            'status' => Parish::STATUS_PENDING,
        ]);

        $response = $this->patchJson("/api/admin/parishes/{$parish->id}/approve");

        $response->assertForbidden();
    }

    public function test_admin_can_reject_a_parish(): void
    {
        $admin = User::factory()->admin()->create();
        Sanctum::actingAs($admin, ['*']);

        $parishUser = User::factory()->create();
        $parish = Parish::factory()->create([
            'user_id' => $parishUser->id,
            'status' => Parish::STATUS_PENDING,
        ]);

        $response = $this->patchJson("/api/admin/parishes/{$parish->id}/reject", [
            'rejection_reason' => 'Documentação incompleta.',
        ]);

        $response->assertOk();
        $response->assertJsonPath('message', 'Paróquia rejeitada.');

        $this->assertDatabaseHas('parishes', [
            'id' => $parish->id,
            'status' => Parish::STATUS_REJECTED,
            'rejection_reason' => 'Documentação incompleta.',
        ]);
    }
}
