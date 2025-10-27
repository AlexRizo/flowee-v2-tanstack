import { Role } from "../api/interfaces/auth.interface"

export interface User {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  isActive: boolean
  role: Role
}