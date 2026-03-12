import { httpClient } from './http-client'
import type { Parish } from '@/types/parish'
import type { ParishDetail } from '@/types/parish'
import type { ApiResponse } from '@/types/api'
import type { PaginatedResponse } from '@/types/api'

export interface GetPublicParishesParams {
  neighborhood?: string
  day_of_week?: string | number
  page?: number
}

export async function getPublicParishes(
  params?: GetPublicParishesParams
): Promise<PaginatedResponse<Parish>> {
  const searchParams = new URLSearchParams()
  if (params?.neighborhood) searchParams.set('neighborhood', params.neighborhood)
  if (params?.day_of_week !== undefined)
    searchParams.set('day_of_week', String(params.day_of_week))
  if (params?.page !== undefined) searchParams.set('page', String(params.page))

  const query = searchParams.toString()
  const path = query ? `/public/parishes?${query}` : '/public/parishes'
  return httpClient.get<PaginatedResponse<Parish>>(path)
}

export async function getPublicParishById(
  id: number
): Promise<ApiResponse<ParishDetail>> {
  return httpClient.get<ApiResponse<ParishDetail>>(`/public/parishes/${id}`)
}
