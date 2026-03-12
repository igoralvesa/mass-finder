import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateParishMassSchedule } from '@/api/parish'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { UpdateMassScheduleRequest } from '@/types/auth'

export function useUpdateParishMassSchedule() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number
      body: UpdateMassScheduleRequest
    }) => updateParishMassSchedule(token!, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parishMassSchedules() })
      queryClient.invalidateQueries({ queryKey: queryKeys.parishProfile() })
    },
  })
}
