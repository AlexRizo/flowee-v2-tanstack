import type { ApiError } from '@/lib/api/api'
import type {
  CreateUserDto,
  UpdateUserDto,
  User,
} from '@/lib/api/interfaces/users.interface'
import {
  getUsers,
  createUser as createUserApi,
  deleteUser as deleteUserApi,
  updateUser as updateUserApi,
} from '@/lib/api/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminUsers = () => {
  const queryClient = useQueryClient()

  const initialData = queryClient.getQueryData<User[]>(['users'])

  const users = useQuery<User[], ApiError>({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })

  const createUser = useMutation<User, ApiError, CreateUserDto>({
    mutationKey: ['users'],
    mutationFn: createUserApi,
    onSuccess: (user) => {
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
        if (!oldUsers) return [user]
        return [user, ...oldUsers]
      })
    },
  })

  const updateUser = useMutation<User, ApiError, UpdateUserDto>({
    mutationKey: ['users'],
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
        if (!oldUsers) return []
        return oldUsers.map((u) => (u.id === user.id ? user : u))
      })
    },
  })

  const deleteUser = useMutation<void, ApiError, string>({
    mutationKey: ['users'],
    mutationFn: deleteUserApi,
    onSuccess: (_, userId) => {
      queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
        if (!oldUsers) return []
        return oldUsers.filter((u) => u.id !== userId)
      })
    },
  })

  return { users, createUser, deleteUser, updateUser }
}
