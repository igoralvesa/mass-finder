import { useQuery } from '@tanstack/react-query'
import { getParishMassSchedules } from '@/api/parish'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useParishMassSchedules() {
  const token = getAccessToken()

  return useQuery({
    queryKey: queryKeys.parishMassSchedules(),
    queryFn: () => getParishMassSchedules(token!),
    enabled: !!token,
  })
}
