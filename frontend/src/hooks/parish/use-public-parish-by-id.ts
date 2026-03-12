import { useQuery } from '@tanstack/react-query'
import { getPublicParishById } from '@/api/public-parishes'
import { queryKeys } from '@/utils/query-keys'

export function usePublicParishById(id: number) {
  return useQuery({
    queryKey: queryKeys.publicParish(id),
    queryFn: () => getPublicParishById(id),
    enabled: id > 0,
  })
}
