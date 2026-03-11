<?php

namespace Tests\Feature;

use App\Models\Parish;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_request_returns_401(): void
    {
        $response = $this->getJson('/api/auth/me');
        $response->assertUnauthorized();
    }

    public function test_unauthenticated_cannot_access_parish_routes(): void
    {
        $response = $this->getJson('/api/parish/mass-schedules');
        $response->assertUnauthorized();
    }

    public function test_unauthenticated_cannot_access_admin_routes(): void
    {
        $response = $this->getJson('/api/admin/parishes');
        $response->assertUnauthorized();
    }

    public function test_parish_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create();
        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/admin/parishes');
        $response->assertForbidden();
    }

    public function test_admin_user_cannot_access_parish_routes(): void
    {
        $admin = User::factory()->admin()->create();
        \Laravel\Sanctum\Sanctum::actingAs($admin, ['*']);

        $response = $this->getJson('/api/parish/mass-schedules');
        $response->assertForbidden();
    }
}
