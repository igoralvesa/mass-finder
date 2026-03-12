import type { MassSchedule } from './mass-schedule'

export interface Parish {
  id: number
  name: string
  cnpj: string
  neighborhood: string
  address: string
}

export interface ParishDetail extends Parish {
  mass_schedules: MassSchedule[]
}

export type ParishStatus = 'pending' | 'approved' | 'rejected'

export interface AdminParish extends Parish {
  user_id?: number
  status: ParishStatus
  rejection_reason: string | null
  mass_schedules?: MassSchedule[]
}
