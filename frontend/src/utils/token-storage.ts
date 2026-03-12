const TOKEN_KEY = 'mass-finder-token'

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}
