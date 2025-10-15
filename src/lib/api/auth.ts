import { apiGet, apiPost } from './api'
import type {
  LogoutResponse,
  AuthUser,
  LoginDto,
} from './interfaces/auth.interface'

export const login = async (body: LoginDto) => {
  return await apiPost<AuthUser>('/auth/login', body)
}

export const getMe = async () => {
  return await apiGet<AuthUser>('/auth/me')
}

export const logout = async () => {
  return await apiPost<LogoutResponse>('/auth/logout')
}
