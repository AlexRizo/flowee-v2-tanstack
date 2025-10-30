import { apiGet } from "./api"
import type { User } from "./interfaces/users.interface"

export const getUsers = async () => {
  return await apiGet<User[]>('/users')
}