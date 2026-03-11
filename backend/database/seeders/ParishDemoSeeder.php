<?php

namespace Database\Seeders;

use App\Models\MassSchedule;
use App\Models\Parish;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ParishDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parishes = [
            [
                'user' => [
                    'name' => 'Paróquia Boa Viagem',
                    'email' => 'paroquia.boaviagem@demo.local',
                    'password' => Hash::make('password123'),
                ],
                'parish' => [
                    'name' => 'Paróquia Boa Viagem',
                    'cnpj' => '11111111000191',
                    'neighborhood' => 'Boa Viagem',
                    'address' => 'Av. Boa Viagem, 1000',
                    'status' => Parish::STATUS_APPROVED,
                ],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Paróquia Casa Forte',
                    'email' => 'paroquia.casaforte@demo.local',
                    'password' => Hash::make('password123'),
                ],
                'parish' => [
                    'name' => 'Paróquia Casa Forte',
                    'cnpj' => '22222222000192',
                    'neighborhood' => 'Casa Forte',
                    'address' => 'Rua do Riachuelo, 500',
                    'status' => Parish::STATUS_APPROVED,
                ],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Paróquia Parnamirim',
                    'email' => 'paroquia.parnamirim@demo.local',
                    'password' => Hash::make('password123'),
                ],
                'parish' => [
                    'name' => 'Paróquia Parnamirim',
                    'cnpj' => '33333333000193',
                    'neighborhood' => 'Parnamirim',
                    'address' => 'Av. Principal, 200',
                    'status' => Parish::STATUS_APPROVED,
                ],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                ],
            ],
            [
                'user' => [
                    'name' => 'Paróquia Pendente',
                    'email' => 'paroquia.pendente@demo.local',
                    'password' => Hash::make('password123'),
                ],
                'parish' => [
                    'name' => 'Paróquia Pendente',
                    'cnpj' => '44444444000194',
                    'neighborhood' => 'Centro',
                    'address' => 'Rua do Centro, 1',
                    'status' => Parish::STATUS_PENDING,
                ],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '08:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:00'],
                ],
            ],
        ];

        foreach ($parishes as $data) {
            $user = User::updateOrCreate(
                ['email' => $data['user']['email']],
                [
                    'name' => $data['user']['name'],
                    'password' => $data['user']['password'],
                    'role' => User::ROLE_PARISH,
                    'email_verified_at' => now(),
                ]
            );

            $parish = Parish::updateOrCreate(
                ['cnpj' => $data['parish']['cnpj']],
                [
                    'user_id' => $user->id,
                    'name' => $data['parish']['name'],
                    'neighborhood' => $data['parish']['neighborhood'],
                    'address' => $data['parish']['address'],
                    'status' => $data['parish']['status'],
                ]
            );

            foreach ($data['schedules'] as $schedule) {
                MassSchedule::firstOrCreate(
                    [
                        'parish_id' => $parish->id,
                        'day_of_week' => $schedule['day_of_week'],
                        'time' => $schedule['time'],
                    ],
                    ['notes' => null]
                );
            }
        }
    }
}
