import type { AuthUser } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterParishRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  cnpj: string
  neighborhood?: string
  address?: string
}

export interface LoginResponse {
  token: string
  user: AuthUser
}

export interface RegisterParishResponse {
  user: AuthUser
}

export interface UpdateParishProfileRequest {
  name: string
  neighborhood?: string
  address?: string
}

export interface CreateMassScheduleRequest {
  day_of_week: number
  time: string
  notes?: string
}

export interface UpdateMassScheduleRequest {
  day_of_week: number
  time: string
  notes?: string
}

export interface RejectParishRequest {
  rejection_reason: string
}

export type AdminParishStatus = 'pending' | 'approved' | 'rejected'

export interface UpdateAdminParishRequest {
  name: string
  cnpj: string
  neighborhood?: string
  address?: string
  status?: AdminParishStatus
  rejection_reason?: string
}
