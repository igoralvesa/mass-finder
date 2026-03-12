import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '@/api/auth'
import { setAccessToken } from '@/utils/token-storage'
import { queryKeys } from '@/utils/query-keys'
import type { LoginRequest } from '@/types/auth'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: (res) => {
      if (res.data?.token) {
        setAccessToken(res.data.token)
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.me() })
    },
  })
}
