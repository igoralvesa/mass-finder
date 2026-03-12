import { httpClient } from './http-client'
import type { AdminParish } from '@/types/parish'
import type { MassSchedule } from '@/types/mass-schedule'
import type { ApiResponse, ApiMessageResponse } from '@/types/api'
import type {
  RejectParishRequest,
  UpdateAdminParishRequest,
  CreateMassScheduleRequest,
  UpdateMassScheduleRequest,
} from '@/types/auth'

export async function getAdminParishes(
  token: string
): Promise<ApiResponse<AdminParish[]>> {
  return httpClient.get<ApiResponse<AdminParish[]>>('/admin/parishes', token)
}

export async function getAdminParishById(
  token: string,
  id: number
): Promise<ApiResponse<AdminParish>> {
  return httpClient.get<ApiResponse<AdminParish>>(`/admin/parishes/${id}`, token)
}

export async function approveParish(
  token: string,
  id: number
): Promise<ApiMessageResponse<AdminParish>> {
  return httpClient.patch<ApiMessageResponse<AdminParish>>(
    `/admin/parishes/${id}/approve`,
    undefined,
    token
  )
}

export async function rejectParish(
  token: string,
  id: number,
  body: RejectParishRequest
): Promise<ApiMessageResponse<AdminParish>> {
  return httpClient.patch<ApiMessageResponse<AdminParish>>(
    `/admin/parishes/${id}/reject`,
    body,
    token
  )
}

export async function updateAdminParish(
  token: string,
  id: number,
  body: UpdateAdminParishRequest
): Promise<ApiMessageResponse<AdminParish>> {
  return httpClient.put<ApiMessageResponse<AdminParish>>(
    `/admin/parishes/${id}`,
    body,
    token
  )
}

export async function deleteAdminParish(
  token: string,
  id: number
): Promise<void> {
  await httpClient.delete(`/admin/parishes/${id}`, token)
}

export async function getAdminParishMassSchedules(
  token: string,
  parishId: number
): Promise<ApiResponse<MassSchedule[]>> {
  return httpClient.get<ApiResponse<MassSchedule[]>>(
    `/admin/parishes/${parishId}/mass-schedules`,
    token
  )
}

export async function createAdminParishMassSchedule(
  token: string,
  parishId: number,
  body: CreateMassScheduleRequest
): Promise<ApiMessageResponse<MassSchedule>> {
  return httpClient.post<ApiMessageResponse<MassSchedule>>(
    `/admin/parishes/${parishId}/mass-schedules`,
    body,
    token
  )
}

export async function updateAdminMassSchedule(
  token: string,
  id: number,
  body: UpdateMassScheduleRequest
): Promise<ApiMessageResponse<MassSchedule>> {
  return httpClient.put<ApiMessageResponse<MassSchedule>>(
    `/admin/mass-schedules/${id}`,
    body,
    token
  )
}

export async function deleteAdminMassSchedule(
  token: string,
  id: number
): Promise<void> {
  await httpClient.delete(`/admin/mass-schedules/${id}`, token)
}
