import type { ApiError } from '@/lib/api/api'
import {
  createBoard as apiCreateBoard,
  deleteBoard as apiDeleteBoard,
  getAllBoards,
  assignBoardToUser as apiAssignBoardToUser,
  getUserBoards,
  leaveBoard as apiLeaveBoard,
} from '@/lib/api/boards'
import type {
  AssignBoardToUserDto,
  Board,
  CreateBoardDto,
  LeaveBoardDto,
} from '@/lib/api/interfaces/boards.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAdminBoards = (userId?: string) => {
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
        return [board, ...oldBoards]
      })

      queryClient.invalidateQueries({ queryKey: ['my-boards'] })
    },
  })

  const deleteBoard = useMutation<void, ApiError, string>({
    mutationKey: ['boards'],
    mutationFn: apiDeleteBoard,
    onSuccess: (_, boardId) => {
      queryClient.setQueryData<Board[]>(['boards'], (oldBoards) => {
        if (!oldBoards) return []
        return oldBoards.filter((board) => board.id !== boardId)
      })
      queryClient.invalidateQueries({ queryKey: ['my-boards'] })
    },
  })

  const userBoards = useQuery({
    queryKey: ['boards', userId],
    queryFn: () => getUserBoards(userId!),
    retry: false,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })

  const assignBoardToUser = useMutation<Board, ApiError, AssignBoardToUserDto>({
    mutationKey: ['boards', userId],
    mutationFn: apiAssignBoardToUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards', userId] })
      toast.success('Usuario asignado al tablero')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const leaveBoard = useMutation<void, ApiError, LeaveBoardDto>({
    mutationKey: ['boards', userId],
    mutationFn: apiLeaveBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards', userId] })
      toast.success('Usuario expulsado del tablero')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    boards,
    createBoard,
    deleteBoard,
    assignBoardToUser,
    userBoards,
    leaveBoard,
  }
}
