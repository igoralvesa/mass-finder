import type { ApiErrorResponse } from '@/types/api'
import { HttpError } from '@/types/api'

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  body?: unknown
  token?: string
}

async function request<T>(
  method: HttpMethod,
  path: string,
  options?: RequestOptions
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (options?.body) {
    headers['Content-Type'] = 'application/json'
  }

  if (options?.token) {
    headers['Authorization'] = `Bearer ${options.token}`
  }

  const body = options?.body ? JSON.stringify(options.body) : undefined

  const response = await fetch(url, {
    method,
    headers,
    body,
  })

  if (response.status === 204) {
    return undefined as T
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse
    try {
      const json = await response.json()
      errorData = json as ApiErrorResponse
    } catch {
      errorData = { message: response.statusText || 'Request failed' }
    }
    throw new HttpError(
      errorData.message,
      response.status,
      errorData.errors
    )
  }

  const contentType = response.headers.get('Content-Type')
  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>
  }

  return undefined as T
}

export const httpClient = {
  get: <T>(path: string, token?: string) =>
    request<T>('GET', path, { token }),

  post: <T>(path: string, body?: unknown, token?: string) =>
    request<T>('POST', path, { body, token }),

  put: <T>(path: string, body?: unknown, token?: string) =>
    request<T>('PUT', path, { body, token }),

  patch: <T>(path: string, body?: unknown, token?: string) =>
    request<T>('PATCH', path, { body, token }),

  delete: <T>(path: string, token?: string) =>
    request<T>('DELETE', path, { token }),
}
