import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAdminParish } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useDeleteAdminParish() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (id: number) => deleteAdminParish(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParishes() })
    },
  })
}
