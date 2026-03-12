import { useQuery } from '@tanstack/react-query'
import { getAdminParishMassSchedules } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useAdminParishMassSchedules(parishId: number) {
  const token = getAccessToken()

  return useQuery({
    queryKey: queryKeys.adminParishMassSchedules(parishId),
    queryFn: () => getAdminParishMassSchedules(token!, parishId),
    enabled: !!token && parishId > 0,
  })
}
