<?php

namespace Tests\Feature\Parish;

use App\Models\MassSchedule;
use App\Models\Parish;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MassScheduleTest extends TestCase
{
    use RefreshDatabase;

    public function test_parish_can_create_a_mass_schedule(): void
    {
        $user = User::factory()->create();
        $parish = Parish::factory()->approved()->create(['user_id' => $user->id]);
        Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('/api/parish/mass-schedules', [
            'day_of_week' => 0,
            'time' => '08:00',
            'notes' => 'Missa dominical',
        ]);

        $response->assertCreated();
        $response->assertJsonPath('message', 'Horário criado com sucesso.');

        $this->assertDatabaseHas('mass_schedules', [
            'parish_id' => $parish->id,
            'day_of_week' => 0,
            'time' => '08:00:00',
        ]);
    }

    public function test_parish_cannot_update_schedule_of_another_parish(): void
    {
        $user1 = User::factory()->create();
        $parish1 = Parish::factory()->approved()->create(['user_id' => $user1->id]);

        $user2 = User::factory()->create();
        $parish2 = Parish::factory()->approved()->create(['user_id' => $user2->id]);

        $schedule = MassSchedule::factory()->create(['parish_id' => $parish2->id]);

        Sanctum::actingAs($user1, ['*']);

        $response = $this->putJson("/api/parish/mass-schedules/{$schedule->id}", [
            'day_of_week' => 1,
            'time' => '10:00',
        ]);

        $response->assertNotFound();
    }

    public function test_parish_can_delete_own_schedule(): void
    {
        $user = User::factory()->create();
        $parish = Parish::factory()->approved()->create(['user_id' => $user->id]);
        $schedule = MassSchedule::factory()->create(['parish_id' => $parish->id]);

        Sanctum::actingAs($user, ['*']);

        $response = $this->deleteJson("/api/parish/mass-schedules/{$schedule->id}");

        $response->assertOk();
        $response->assertJsonPath('message', 'Horário removido com sucesso.');
        $this->assertDatabaseMissing('mass_schedules', ['id' => $schedule->id]);
    }

    public function test_parish_cannot_delete_schedule_of_another_parish(): void
    {
        $user1 = User::factory()->create();
        Parish::factory()->approved()->create(['user_id' => $user1->id]);

        $user2 = User::factory()->create();
        $parish2 = Parish::factory()->approved()->create(['user_id' => $user2->id]);
        $schedule = MassSchedule::factory()->create(['parish_id' => $parish2->id]);

        Sanctum::actingAs($user1, ['*']);

        $response = $this->deleteJson("/api/parish/mass-schedules/{$schedule->id}");

        $response->assertNotFound();
        $this->assertDatabaseHas('mass_schedules', ['id' => $schedule->id]);
    }
}
