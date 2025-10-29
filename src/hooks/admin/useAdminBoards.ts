import type { ApiError } from '@/lib/api/api'
import { createBoard as apiCreateBoard, getAllBoards } from '@/lib/api/boards'
import type {
  Board,
  CreateBoardDto,
} from '@/lib/api/interfaces/boards.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAdminBoards = () => {
  const queryClient = useQueryClient()

  const initialData = queryClient.getQueryData<Board[]>(['boards']) || undefined

  const boards = useQuery<Board[], ApiError>({
    queryKey: ['boards'],
    queryFn: getAllBoards,
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })

  const createBoard = useMutation<Board, ApiError, CreateBoardDto>({
    mutationKey: ['boards'],
    mutationFn: apiCreateBoard,
    onSuccess: (board) => {
      queryClient.setQueryData<Board[]>(['boards'], (oldBoards) => {
        if (!oldBoards) return [board]
        return [...oldBoards, board]
      })

      queryClient.invalidateQueries({ queryKey: ['my-boards'] })
    },
  })

  return { boards, createBoard }
}
