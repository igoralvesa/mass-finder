<?php

namespace Database\Factories;

use App\Models\MassSchedule;
use App\Models\Parish;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MassSchedule>
 */
class MassScheduleFactory extends Factory
{
    protected $model = MassSchedule::class;

    public function definition(): array
    {
        return [
            'parish_id' => Parish::factory(),
            'day_of_week' => fake()->numberBetween(0, 6),
            'time' => fake()->time('H:i'),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
