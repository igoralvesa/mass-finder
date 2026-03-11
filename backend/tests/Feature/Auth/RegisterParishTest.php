<?php

namespace Tests\Feature\Auth;

use App\Models\Parish;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterParishTest extends TestCase
{
    use RefreshDatabase;

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Paróquia Teste',
            'email' => 'paroquia@teste.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'cnpj' => '12.345.678/0001-99',
            'neighborhood' => 'Centro',
            'address' => 'Rua Teste, 123',
        ], $overrides);
    }

    public function test_register_parish_creates_user_and_parish(): void
    {
        $response = $this->postJson('/api/auth/register-parish', $this->validPayload());

        $response->assertCreated();
        $response->assertJsonPath('message', 'Paróquia cadastrada com sucesso. Verifique seu email.');

        $this->assertDatabaseHas('users', [
            'email' => 'paroquia@teste.com',
            'role' => User::ROLE_PARISH,
        ]);

        $this->assertDatabaseHas('parishes', [
            'cnpj' => '12.345.678/0001-99',
            'status' => Parish::STATUS_PENDING,
        ]);
    }

    public function test_register_parish_rejects_duplicate_email(): void
    {
        User::factory()->create(['email' => 'paroquia@teste.com']);

        $response = $this->postJson('/api/auth/register-parish', $this->validPayload());

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('email');
    }

    public function test_register_parish_rejects_duplicate_cnpj(): void
    {
        $user = User::factory()->create();
        Parish::factory()->create([
            'user_id' => $user->id,
            'cnpj' => '12.345.678/0001-99',
        ]);

        $response = $this->postJson('/api/auth/register-parish', $this->validPayload());

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('cnpj');
    }
}
