import type { ApiError } from '@/lib/api/api'
import { getMyBoards } from '@/lib/api/boards'
import type { Board } from '@/lib/api/interfaces/boards.interface'
import { useQuery } from '@tanstack/react-query'

export const useBoards = () => {
  const {
    data: boards,
    isPending: isBoardsPending,
    error: boardsError,
  } = useQuery<Board[], ApiError>({
    queryKey: ['my-boards'],
    queryFn: getMyBoards,
  })

  return {
    boards,
    isBoardsPending,
    boardsError,
  }
}
