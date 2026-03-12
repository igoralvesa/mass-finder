import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rejectParish } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { RejectParishRequest } from '@/types/auth'

export function useRejectParish() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: RejectParishRequest }) =>
      rejectParish(token!, id, body),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParishes() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParish(id) })
    },
  })
}
