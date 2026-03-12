export interface ApiResponse<T> {
  data: T
}

export interface ApiMessageResponse<T> {
  message: string
  data?: T
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface ApiErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

export class HttpError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.errors = errors
  }
}
