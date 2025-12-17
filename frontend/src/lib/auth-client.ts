
// Real backend authentication client

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export interface User {
  id: number
  email: string
  name: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export async function signUp(email: string, password: string, name: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Signup failed' }))
    throw new Error(error.detail || error.message || 'Failed to create account')
  }

  const data: AuthResponse = await response.json()
  
  // Store token and user
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }
  
  return data
}

export async function signIn(email: string, password: string) {
  // FastAPI expects form data for OAuth2
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Login failed' }))
    throw new Error(error.detail || error.message || 'Invalid email or password')
  }

  const data: AuthResponse = await response.json()
  
  // Store token and user
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }
  
  return data
}

export async function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
