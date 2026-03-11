<?php

namespace Database\Factories;

use App\Models\Parish;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Parish>
 */
class ParishFactory extends Factory
{
    protected $model = Parish::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->company() . ' Parish',
            'cnpj' => fake()->unique()->numerify('##.###.###/####-##'),
            'neighborhood' => fake()->citySuffix() . ' ' . fake()->lastName(),
            'address' => fake()->streetAddress(),
            'status' => Parish::STATUS_PENDING,
            'rejection_reason' => null,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => Parish::STATUS_APPROVED,
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => Parish::STATUS_REJECTED,
            'rejection_reason' => 'Documentação incompleta.',
        ]);
    }
}
