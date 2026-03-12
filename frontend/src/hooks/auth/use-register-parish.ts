import { useMutation } from '@tanstack/react-query'
import { registerParish } from '@/api/auth'
import type { RegisterParishRequest } from '@/types/auth'

export function useRegisterParish() {
  return useMutation({
    mutationFn: (body: RegisterParishRequest) => registerParish(body),
  })
}
