<?php

namespace Tests\Feature\Public;

use App\Models\MassSchedule;
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

    public function test_public_listing_includes_mass_schedules(): void
    {
        $user = User::factory()->create();
        $parish = Parish::factory()->approved()->create(['user_id' => $user->id]);

        MassSchedule::factory()->create([
            'parish_id' => $parish->id,
            'day_of_week' => MassSchedule::SUNDAY,
            'time' => '08:00',
        ]);
        MassSchedule::factory()->create([
            'parish_id' => $parish->id,
            'day_of_week' => MassSchedule::WEDNESDAY,
            'time' => '19:00',
        ]);

        $response = $this->getJson('/api/public/parishes');

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertJsonCount(2, 'data.0.mass_schedules');
        $response->assertJsonPath('data.0.mass_schedules.0.day_of_week', fn ($v) => is_int($v));
        $response->assertJsonPath('data.0.mass_schedules.0.time', fn ($v) => is_string($v));
    }

    public function test_public_listing_filters_by_neighborhood(): void
    {
        $user1 = User::factory()->create();
        Parish::factory()->approved()->create([
            'user_id' => $user1->id,
            'neighborhood' => 'Centro',
        ]);

        $user2 = User::factory()->create();
        Parish::factory()->approved()->create([
            'user_id' => $user2->id,
            'neighborhood' => 'Boa Viagem',
        ]);

        $response = $this->getJson('/api/public/parishes?neighborhood=centro');

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.neighborhood', 'Centro');
    }

    public function test_public_listing_filters_by_day_of_week(): void
    {
        $user1 = User::factory()->create();
        $parish1 = Parish::factory()->approved()->create(['user_id' => $user1->id]);
        MassSchedule::factory()->create([
            'parish_id' => $parish1->id,
            'day_of_week' => MassSchedule::SUNDAY,
        ]);

        $user2 = User::factory()->create();
        $parish2 = Parish::factory()->approved()->create(['user_id' => $user2->id]);
        MassSchedule::factory()->create([
            'parish_id' => $parish2->id,
            'day_of_week' => MassSchedule::WEDNESDAY,
        ]);

        $response = $this->getJson('/api/public/parishes?day_of_week=sunday');

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertJsonCount(1, 'data.0.mass_schedules');
    }

    public function test_public_show_route_no_longer_exists(): void
    {
        $user = User::factory()->create();
        $parish = Parish::factory()->approved()->create(['user_id' => $user->id]);

        $response = $this->getJson("/api/public/parishes/{$parish->id}");

        $response->assertNotFound();
    }
}
