import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAdminParishMassSchedule } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { CreateMassScheduleRequest } from '@/types/auth'

export function useCreateAdminParishMassSchedule(parishId: number) {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (body: CreateMassScheduleRequest) =>
      createAdminParishMassSchedule(token!, parishId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminParishMassSchedules(parishId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParish(parishId) })
    },
  })
}
