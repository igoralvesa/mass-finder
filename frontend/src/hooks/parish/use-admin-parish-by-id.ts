import { useQuery } from '@tanstack/react-query'
import { getAdminParishById } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useAdminParishById(id: number) {
  const token = getAccessToken()

  return useQuery({
    queryKey: queryKeys.adminParish(id),
    queryFn: () => getAdminParishById(token!, id),
    enabled: !!token && id > 0,
  })
}
