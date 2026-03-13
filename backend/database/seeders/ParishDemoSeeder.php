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
                'user' => ['name' => 'Paróquia Boa Viagem', 'email' => 'paroquia.boaviagem@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia Nossa Senhora da Boa Viagem', 'cnpj' => '11111111000191', 'neighborhood' => 'Boa Viagem', 'address' => 'Av. Boa Viagem, 1000', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '11:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::FRIDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Casa Forte', 'email' => 'paroquia.casaforte@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia de Casa Forte', 'cnpj' => '22222222000192', 'neighborhood' => 'Casa Forte', 'address' => 'Rua do Riachuelo, 500', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:30'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::TUESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Parnamirim', 'email' => 'paroquia.parnamirim@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia São José do Parnamirim', 'cnpj' => '33333333000193', 'neighborhood' => 'Parnamirim', 'address' => 'Av. Conselheiro Rosa e Silva, 200', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Espinheiro', 'email' => 'paroquia.espinheiro@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia do Espinheiro', 'cnpj' => '44444444000194', 'neighborhood' => 'Espinheiro', 'address' => 'Rua do Espinheiro, 150', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '08:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '10:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:30'],
                    ['day_of_week' => MassSchedule::MONDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::THURSDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Derby', 'email' => 'paroquia.derby@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia do Derby', 'cnpj' => '55555555000195', 'neighborhood' => 'Derby', 'address' => 'Rua do Derby, 320', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:30'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:30'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Graças', 'email' => 'paroquia.gracas@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia das Graças', 'cnpj' => '66666666000196', 'neighborhood' => 'Graças', 'address' => 'Av. Rui Barbosa, 890', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '10:30'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:00'],
                    ['day_of_week' => MassSchedule::TUESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::FRIDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Madalena', 'email' => 'paroquia.madalena@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia da Madalena', 'cnpj' => '77777777000197', 'neighborhood' => 'Madalena', 'address' => 'Rua da Madalena, 245', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '08:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:30'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Torre', 'email' => 'paroquia.torre@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia da Torre', 'cnpj' => '88888888000198', 'neighborhood' => 'Torre', 'address' => 'Av. da Torre, 567', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '11:00'],
                    ['day_of_week' => MassSchedule::THURSDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Imbiribeira', 'email' => 'paroquia.imbiribeira@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia da Imbiribeira', 'cnpj' => '99999999000199', 'neighborhood' => 'Imbiribeira', 'address' => 'Av. Mascarenhas de Morais, 1200', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:30'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::MONDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Afogados', 'email' => 'paroquia.afogados@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia de Afogados', 'cnpj' => '10101010000101', 'neighborhood' => 'Afogados', 'address' => 'Rua dos Afogados, 450', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '08:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '10:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:00'],
                    ['day_of_week' => MassSchedule::TUESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:30'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Santo Amaro', 'email' => 'paroquia.santoamaro@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia de Santo Amaro', 'cnpj' => '12121212000121', 'neighborhood' => 'Santo Amaro', 'address' => 'Rua do Hospício, 200', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::FRIDAY, 'time' => '18:30'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Ilha do Leite', 'email' => 'paroquia.ilhadoleite@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia da Ilha do Leite', 'cnpj' => '13131313000131', 'neighborhood' => 'Ilha do Leite', 'address' => 'Rua da Aurora, 100', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '08:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '10:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:00'],
                    ['day_of_week' => MassSchedule::MONDAY, 'time' => '12:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Santo Antônio', 'email' => 'paroquia.santoantonio@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia de Santo Antônio', 'cnpj' => '14141414000141', 'neighborhood' => 'Santo Antônio', 'address' => 'Rua do Imperador, 300', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:30'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:30'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::TUESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::THURSDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Tamarineira', 'email' => 'paroquia.tamarineira@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia da Tamarineira', 'cnpj' => '15151515000151', 'neighborhood' => 'Tamarineira', 'address' => 'Av. Norte, 800', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:30'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '18:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Cordeiro', 'email' => 'paroquia.cordeiro@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia do Cordeiro', 'cnpj' => '16161616000161', 'neighborhood' => 'Cordeiro', 'address' => 'Rua do Cordeiro, 120', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '08:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '10:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:30'],
                    ['day_of_week' => MassSchedule::FRIDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:30'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Centro', 'email' => 'paroquia.centro@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia do Recife (Centro)', 'cnpj' => '18181818000181', 'neighborhood' => 'Centro', 'address' => 'Praça da Sé, 100', 'status' => Parish::STATUS_APPROVED],
                'schedules' => [
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '07:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '09:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '11:00'],
                    ['day_of_week' => MassSchedule::SUNDAY, 'time' => '18:00'],
                    ['day_of_week' => MassSchedule::MONDAY, 'time' => '12:00'],
                    ['day_of_week' => MassSchedule::WEDNESDAY, 'time' => '19:00'],
                    ['day_of_week' => MassSchedule::SATURDAY, 'time' => '17:00'],
                ],
            ],
            [
                'user' => ['name' => 'Paróquia Pendente', 'email' => 'paroquia.pendente@demo.local', 'password' => Hash::make('password123')],
                'parish' => ['name' => 'Paróquia Pendente', 'cnpj' => '17171717000171', 'neighborhood' => 'Centro', 'address' => 'Rua do Centro, 1', 'status' => Parish::STATUS_PENDING],
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
