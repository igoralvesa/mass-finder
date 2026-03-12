import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/api/auth'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useMe() {
  const token = getAccessToken()

  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: () => getMe(token!),
    enabled: !!token,
  })
}
