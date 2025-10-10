export interface LoginDto {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  username: string
  role: Role
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  READER = 'READER',
  DESIGNER_ADMIN = 'DESIGNER_ADMIN',
  DESIGNER = 'DESIGNER',
  PUBLISHER_ADMIN = 'PUBLISHER_ADMIN',
  PUBLISHER = 'PUBLISHER',
}

export interface LogoutResponse {
  message: string
}