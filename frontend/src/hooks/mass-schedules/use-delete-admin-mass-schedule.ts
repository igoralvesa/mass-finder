import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAdminMassSchedule } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useDeleteAdminMassSchedule() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (id: number) => deleteAdminMassSchedule(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParishes() })
    },
  })
}
