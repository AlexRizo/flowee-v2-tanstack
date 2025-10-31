import { apiDelete, apiGet, apiPatch, apiPost } from "./api"
import type { CreateUserDto, UpdateUserDto, User } from "./interfaces/users.interface"

export const getUsers = async () => {
  return await apiGet<User[]>('/users')
}

export const createUser = async (user: CreateUserDto) => {
  return await apiPost<User>('/users', user)
}

export const deleteUser = async (userId: string) => {
  return await apiDelete<void>(`/users/${userId}`)
}

export const updateUser = async ({id, ...user}: UpdateUserDto) => {
  return await apiPatch<User>(`/users/${id}`, user)
}