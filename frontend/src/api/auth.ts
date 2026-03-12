import { httpClient } from './http-client'
import type { AuthUser } from '@/types/user'
import type { ApiResponse, ApiMessageResponse } from '@/types/api'
import type {
  LoginRequest,
  RegisterParishRequest,
  LoginResponse,
  RegisterParishResponse,
} from '@/types/auth'

export async function registerParish(
  body: RegisterParishRequest
): Promise<ApiMessageResponse<RegisterParishResponse>> {
  return httpClient.post<ApiMessageResponse<RegisterParishResponse>>(
    '/auth/register-parish',
    body
  )
}

export async function login(
  body: LoginRequest
): Promise<ApiMessageResponse<LoginResponse>> {
  return httpClient.post<ApiMessageResponse<LoginResponse>>('/auth/login', body)
}

export async function logout(token: string): Promise<ApiMessageResponse<void>> {
  return httpClient.post<ApiMessageResponse<void>>('/auth/logout', undefined, token)
}

export async function getMe(token: string): Promise<ApiResponse<AuthUser>> {
  return httpClient.get<ApiResponse<AuthUser>>('/auth/me', token)
}
