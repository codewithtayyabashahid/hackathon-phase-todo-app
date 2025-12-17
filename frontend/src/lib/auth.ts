export interface User {
  id: number
  email: string
  name: string
}

export interface Session {
  user: User
  token: string
}