import type { ApiError } from '@/lib/api/api'
import { getBoardUsers } from '@/lib/api/boards'
import { Role } from '@/lib/api/interfaces/auth.interface'
import type { DesignerBoardUser } from '@/lib/api/interfaces/boards.interface'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useAssignments = (boardId?: string) => {
  const queryClient = useQueryClient()

  const boardDesigners = useQuery<DesignerBoardUser[], ApiError>({
    queryKey: ['board-designers', boardId],
    queryFn: () => getBoardUsers(boardId!, Role.DESIGNER),
    enabled: !!boardId,
  })

  return {
    boardDesigners: {
      users: boardDesigners.data,
      query: boardDesigners,
    },
  }
}
