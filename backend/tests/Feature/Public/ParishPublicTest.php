<?php

namespace Tests\Feature\Public;

use App\Models\Parish;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParishPublicTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_listing_returns_only_approved_parishes(): void
    {
        $approvedUser = User::factory()->create();
        Parish::factory()->approved()->create(['user_id' => $approvedUser->id]);

        $pendingUser = User::factory()->create();
        Parish::factory()->create(['user_id' => $pendingUser->id, 'status' => Parish::STATUS_PENDING]);

        $rejectedUser = User::factory()->create();
        Parish::factory()->rejected()->create(['user_id' => $rejectedUser->id]);

        $response = $this->getJson('/api/public/parishes');

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.name', fn ($name) => is_string($name));
    }

    public function test_public_show_returns_404_for_non_approved_parish(): void
    {
        $user = User::factory()->create();
        $parish = Parish::factory()->create([
            'user_id' => $user->id,
            'status' => Parish::STATUS_PENDING,
        ]);

        $response = $this->getJson("/api/public/parishes/{$parish->id}");

        $response->assertNotFound();
        $response->assertJsonPath('message', 'Paróquia não encontrada.');
    }
}
