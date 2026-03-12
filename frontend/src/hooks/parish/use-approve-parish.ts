import { useMutation, useQueryClient } from '@tanstack/react-query'
import { approveParish } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useApproveParish() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (id: number) => approveParish(token!, id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParishes() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParish(id) })
    },
  })
}
