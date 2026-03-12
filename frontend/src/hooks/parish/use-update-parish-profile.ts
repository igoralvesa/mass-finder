import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateParishProfile } from '@/api/parish'
import { getAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { UpdateParishProfileRequest } from '@/types/auth'

export function useUpdateParishProfile() {
  const queryClient = useQueryClient()
  const token = getAccessToken()

  return useMutation({
    mutationFn: (body: UpdateParishProfileRequest) =>
      updateParishProfile(token!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.parishProfile() })
    },
  })
}
