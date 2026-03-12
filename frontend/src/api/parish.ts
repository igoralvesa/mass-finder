import { httpClient } from './http-client'
import type { ParishDetail } from '@/types/parish'
import type { MassSchedule } from '@/types/mass-schedule'
import type { ApiResponse, ApiMessageResponse } from '@/types/api'
import type {
  UpdateParishProfileRequest,
  CreateMassScheduleRequest,
  UpdateMassScheduleRequest,
} from '@/types/auth'

export async function getParishProfile(
  token: string
): Promise<ApiResponse<ParishDetail>> {
  return httpClient.get<ApiResponse<ParishDetail>>('/parish/profile', token)
}

export async function updateParishProfile(
  token: string,
  body: UpdateParishProfileRequest
): Promise<ApiMessageResponse<ParishDetail>> {
  return httpClient.put<ApiMessageResponse<ParishDetail>>(
    '/parish/profile',
    body,
    token
  )
}

export async function getParishMassSchedules(
  token: string
): Promise<ApiResponse<MassSchedule[]>> {
  return httpClient.get<ApiResponse<MassSchedule[]>>(
    '/parish/mass-schedules',
    token
  )
}

export async function createParishMassSchedule(
  token: string,
  body: CreateMassScheduleRequest
): Promise<ApiMessageResponse<MassSchedule>> {
  return httpClient.post<ApiMessageResponse<MassSchedule>>(
    '/parish/mass-schedules',
    body,
    token
  )
}

export async function updateParishMassSchedule(
  token: string,
  id: number,
  body: UpdateMassScheduleRequest
): Promise<ApiMessageResponse<MassSchedule>> {
  return httpClient.put<ApiMessageResponse<MassSchedule>>(
    `/parish/mass-schedules/${id}`,
    body,
    token
  )
}

export async function deleteParishMassSchedule(
  token: string,
  id: number
): Promise<void> {
  await httpClient.delete(`/parish/mass-schedules/${id}`, token)
}
