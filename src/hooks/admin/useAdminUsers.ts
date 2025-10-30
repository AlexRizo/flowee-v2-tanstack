import type { ApiError } from '@/lib/api/api'
import type { User } from '@/lib/api/interfaces/users.interface'
import { getUsers } from '@/lib/api/users'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminUsers = () => {
  const queryClient = useQueryClient()

  const initialData = queryClient.getQueryData<User[]>(['users'])

  const users = useQuery<User[], ApiError>({
    queryKey: ['users'],
    queryFn: getUsers,
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return { users }
}
