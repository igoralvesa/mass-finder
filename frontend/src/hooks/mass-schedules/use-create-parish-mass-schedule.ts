import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createParishMassSchedule } from '@/api/parish'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { CreateMassScheduleRequest } from '@/types/auth'

export function useCreateParishMassSchedule() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (body: CreateMassScheduleRequest) =>
      createParishMassSchedule(token!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parishMassSchedules() })
      queryClient.invalidateQueries({ queryKey: queryKeys.parishProfile() })
    },
  })
}
