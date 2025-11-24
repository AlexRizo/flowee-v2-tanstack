import type { ApiError } from '@/lib/api/api'
import { getMyBoards } from '@/lib/api/boards'
import type { Board } from '@/lib/api/interfaces/boards.interface'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'

export const useBoards = () => {

  const { user } = useAuth()
  
  const {
    data: boards,
    isPending: isBoardsPending,
    error: boardsError,
  } = useQuery<Board[], ApiError>({
    queryKey: ['my-boards'],
    queryFn: getMyBoards,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!user,
  })

  return {
    boards,
    isBoardsPending,
    boardsError,
  }
}
