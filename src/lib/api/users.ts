import { apiDelete, apiGet, apiPost } from "./api"
import type { CreateUserDto, User } from "./interfaces/users.interface"

export const getUsers = async () => {
  return await apiGet<User[]>('/users')
}

export const createUser = async (user: CreateUserDto) => {
  return await apiPost<User>('/users', user)
}

export const deleteUser = async (userId: string) => {
  return await apiDelete<void>(`/users/${userId}`)
}