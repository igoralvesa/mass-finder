import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAdminParish } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { UpdateAdminParishRequest } from '@/types/auth'

export function useUpdateAdminParish() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number
      body: UpdateAdminParishRequest
    }) => updateAdminParish(token!, id, body),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParishes() })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParish(id) })
    },
  })
}
