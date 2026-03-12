import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/api/auth'
import { getAccessToken, removeAccessToken } from '@/utils/token-storage'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const token = getAccessToken()
      if (token) {
        await logout(token)
        removeAccessToken()
      }
    },
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
