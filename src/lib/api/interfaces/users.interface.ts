import { Role } from "./auth.interface"
import type { Board } from "./boards.interface"

export interface User {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  isActive: boolean
  role: Role
  createdAt: string
  updatedAt: string
  boards?: Board[] 
}

export interface CreateUserDto {
  name: string
  email: string
  username: string
  password: string
  role: Role
}