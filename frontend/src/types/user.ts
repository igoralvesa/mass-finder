import type { ParishDetail } from './parish'

export type UserRole = 'parish' | 'admin'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  email_verified_at: string | null
}

export interface AuthUser extends User {
  parish: ParishDetail
}
