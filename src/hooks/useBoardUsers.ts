import type { ApiError } from '@/lib/api/api'
import { getBoardUsers } from '@/lib/api/boards'
import type { User } from '@/lib/api/interfaces/users.interface'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { useMemo } from 'react'
import { isDesigner } from '@/helpers/protected'
import { Role } from '@/lib/api/interfaces/auth.interface'

export const useBoardUsers = (boardId?: string) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const usersRole = useMemo(() => {
    if (user) {
      const userDesigner = isDesigner(user.role)

      return userDesigner ? Role.DESIGNER : Role.PUBLISHER
    }
  }, [user])

  const boardUsersQuery = useQuery<User[], ApiError>({
    queryKey: ['board-users', boardId],
    queryFn: async () => await getBoardUsers(boardId!, usersRole),
    enabled: !!boardId,
    retry: false,
  })

  return {
    boardUsersQuery,
  }
}
