import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteParishMassSchedule } from '@/api/parish'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'

export function useDeleteParishMassSchedule() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (id: number) => deleteParishMassSchedule(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parishMassSchedules() })
      queryClient.invalidateQueries({ queryKey: queryKeys.parishProfile() })
    },
  })
}
