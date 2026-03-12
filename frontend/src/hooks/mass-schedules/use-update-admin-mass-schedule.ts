import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAdminMassSchedule } from '@/api/admin'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { UpdateMassScheduleRequest } from '@/types/auth'

export function useUpdateAdminMassSchedule() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number
      body: UpdateMassScheduleRequest
    }) => updateAdminMassSchedule(token!, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminParishes() })
    },
  })
}
