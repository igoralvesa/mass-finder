import type { ParishDetail, AdminParish } from '@/types/parish';
import type { MassSchedule } from '@/types/mass-schedule';

export const mockMassSchedules: MassSchedule[] = [
  {
    id: 1,
    parish_id: 1,
    day_of_week: 0,
    time: '08:00:00',
    notes: 'Missa solene',
  },
  { id: 2, parish_id: 1, day_of_week: 3, time: '19:00:00', notes: null },
];

export const mockParishes: ParishDetail[] = [
  {
    id: 1,
    name: 'Paróquia São José',
    cnpj: '12.345.678/0001-90',
    neighborhood: 'Centro',
    address: 'Rua Principal, 100',
    mass_schedules: mockMassSchedules,
  },
  {
    id: 2,
    name: 'Paróquia Nossa Senhora',
    cnpj: '98.765.432/0001-10',
    neighborhood: 'Boa Viagem',
    address: 'Av. Conselheiro Aguiar, 200',
    mass_schedules: [
      { id: 3, parish_id: 2, day_of_week: 6, time: '17:00:00', notes: null },
    ],
  },
];

export const mockAdminParishes: AdminParish[] = [
  {
    id: 1,
    name: 'Paróquia São José',
    cnpj: '12.345.678/0001-90',
    neighborhood: 'Centro',
    address: 'Rua Principal, 100',
    status: 'approved',
    rejection_reason: null,
  },
  {
    id: 2,
    name: 'Paróquia Santa Rita',
    cnpj: '11.222.333/0001-44',
    neighborhood: 'Derby',
    address: 'Rua do Derby, 50',
    status: 'pending',
    rejection_reason: null,
  },
  {
    id: 3,
    name: 'Paróquia Rejeitada',
    cnpj: '55.666.777/0001-88',
    neighborhood: 'Espinheiro',
    address: 'Rua da Aurora, 300',
    status: 'rejected',
    rejection_reason: 'Dados incompletos',
  },
];
