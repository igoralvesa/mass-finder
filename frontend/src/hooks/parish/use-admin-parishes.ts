import { useQuery } from '@tanstack/react-query'
import { getAdminParishes } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useAdminParishes() {
  const token = getAccessToken()

  return useQuery({
    queryKey: queryKeys.adminParishes(),
    queryFn: () => getAdminParishes(token!),
    enabled: !!token,
  })
}
