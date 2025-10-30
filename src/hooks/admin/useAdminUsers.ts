import type { ApiError } from '@/lib/api/api'
import type { CreateUserDto, User } from '@/lib/api/interfaces/users.interface'
import { getUsers, createUser as createUserApi } from '@/lib/api/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminUsers = () => {
  const queryClient = useQueryClient()

  const initialData = queryClient.getQueryData<User[]>(['users'])

  const users = useQuery<User[], ApiError>({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
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

  return { users, createUser }
}
