const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface Task {
  id: number
  user_id: string
  title: string
  description: string
  completed: boolean
  created_at: string
  updated_at: string
}

interface TaskInput {
  title: string
  description: string
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken()
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }))
      throw new Error(error.detail || 'Request failed')
    }

    return response.json()
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    
    const cookies = document.cookie.split(';')
    const tokenCookie = cookies.find(c => c.trim().startsWith('token='))
    return tokenCookie ? tokenCookie.split('=')[1] : null
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(name: string, email: string, password: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  async getCurrentUser() {
    return this.request<{ id: string; email: string; name: string }>('/auth/me')
  }

  // Tasks
  async getTasks(userId: string, status?: 'all' | 'pending' | 'completed'): Promise<Task[]> {
    const params = status && status !== 'all' ? `?status=${status}` : ''
    return this.request<Task[]>(`/${userId}/tasks${params}`)
  }

  async getTask(userId: string, taskId: number): Promise<Task> {
    return this.request<Task>(`/${userId}/tasks/${taskId}`)
  }

  async createTask(userId: string, data: TaskInput): Promise<Task> {
    return this.request<Task>(`/${userId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateTask(userId: string, taskId: number, data: TaskInput): Promise<Task> {
    return this.request<Task>(`/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async toggleTask(userId: string, taskId: number, completed: boolean): Promise<Task> {
    return this.request<Task>(`/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    })
  }

  async deleteTask(userId: string, taskId: number): Promise<void> {
    return this.request<void>(`/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
    })
  }
}

export const api = new ApiClient()