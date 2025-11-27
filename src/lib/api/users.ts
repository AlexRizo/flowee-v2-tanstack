import { apiDelete, apiGet, apiPatch, apiPost } from './api'
import type {
  AvatarResponse,
  CreateUserDto,
  UpdateUserDto,
  User,
} from './interfaces/users.interface'

// ? El term puede ser el username / email / id
export const getUser = async (term: string) => {
  return await apiGet<User>(`/users/${term}`)
}

export const getUsers = async () => {
  return await apiGet<User[]>('/users')
}

export const createUser = async (user: CreateUserDto) => {
  return await apiPost<User>('/users', user)
}

export const deleteUser = async (userId: string) => {
  return await apiDelete<void>(`/users/${userId}`)
}

export const updateUser = async ({ id, ...user }: UpdateUserDto) => {
  return await apiPatch<User>(`/users/${id}`, user)
}



export const uploadAvatar = async (id: string, file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)
  return await apiPatch<AvatarResponse>(`/users/${id}/avatar`, formData)
}
