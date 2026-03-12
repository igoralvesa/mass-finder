import { useQuery } from '@tanstack/react-query'
import { getParishProfile } from '@/api/parish'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useParishProfile() {
  const token = getAccessToken()

  return useQuery({
    queryKey: queryKeys.parishProfile(),
    queryFn: () => getParishProfile(token!),
    enabled: !!token,
  })
}
